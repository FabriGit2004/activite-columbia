import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Stack, Paper, Divider,
  CircularProgress, Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

interface Suscriptor {
  id: number;
  nombre: string;
  telefono: string;
  managerId: number;
}

const API_URL = 'http://127.0.0.1:3001/subscribers';
const WHATSAPP_SEND_URL = 'http://127.0.0.1:3001/whatsapp/send-hello';

const obtenerCookie = (nombre: string): string | null => {
  const nameEQ = nombre + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export default function WhatsappPanel() {
  const [managerId, setManagerId] = useState<string | null>(null);
  const [suscriptores, setSuscriptores] = useState<Suscriptor[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const fetchSubscribers = useCallback(async (userId: string) => {
    try {
      const { data } = await axios.get<Suscriptor[]>(`${API_URL}/${userId}`);
      const validRows = data.filter(r => r.telefono);
      setSuscriptores(validRows);
      if (validRows.length === 0)
        setError('No se encontraron suscriptores válidos para este Manager.');
    } catch (err) {
      setError('Error al obtener los suscriptores. Revisa el endpoint y la cookie.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    const userId = obtenerCookie('userId');
    setManagerId(userId);
    if (userId) fetchSubscribers(userId);
    else {
      setError('No se encontró la cookie "userId". Inicia sesión.');
      setCargando(false);
    }
  }, [fetchSubscribers]);

  const handleSend = async () => {
    if (suscriptores.length === 0) return;

    setEnviando(true);
    setError(null);
    let sentCount = 0;

    try {
      // Enviar mensaje a cada suscriptor del manager
      for (const sub of suscriptores) {
        const payload = { toPhone: sub.telefono };
        const res = await axios.post(WHATSAPP_SEND_URL, payload);

        if (res.status >= 200 && res.status < 300) sentCount++;
      }

      alert(`✅ Envío completado: ${sentCount}/${suscriptores.length} mensajes enviados.`);
    } catch (err: any) {
      const msg = `Error en el envío: ${err.response?.data?.message || err.message}`;
      setError(msg);
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Cargando suscriptores...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Box sx={{ p: 5 }}><Alert severity="error">{error}</Alert></Box>;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: 'auto', mt: 5 }}>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight="bold">
          Envío Masivo con Plantilla <em>hello_world</em>
        </Typography>
        <Divider />

        <Alert severity="info">
          {`Suscriptores cargados: ${suscriptores.length}. Manager ID: ${managerId}`}
        </Alert>

        <Typography>
          Esta acción enviará la plantilla oficial <b>hello_world</b> de WhatsApp Cloud API
          a todos los suscriptores listados de tu cuenta.
        </Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<SendIcon />}
          onClick={handleSend}
          disabled={enviando || suscriptores.length === 0}
        >
          {enviando ? 'Enviando mensajes...' : `Enviar hello_world a ${suscriptores.length} números`}
        </Button>
      </Stack>
    </Paper>
  );
}
