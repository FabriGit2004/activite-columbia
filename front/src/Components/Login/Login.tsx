import * as React from 'react';
import { Box, Card, Typography, IconButton, TextField, Button, Chip, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Global } from '../../global';
import { useState } from 'react';
import axios from 'axios';

interface Props {
  onClose: () => void;
  openDashboard: () => void;
}

export default function BackgroundOverlay({ onClose, openDashboard }: Props) {

  const imageUrl = '/lc.svg';

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [pin, setPin] = useState('');


  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [notVerified, setNotVerified] = useState<boolean>(false);


  const loguearUsuario = async (datos: { correo: string; password: string }) => {
    const API_URL_LOGIN = `api/auth/login`;
    setShowAlert(false);

    try {
      const response = await axios.post(API_URL_LOGIN, datos);
      if (response.status === 201) {
        openDashboard();

        document.cookie = `token=${response.data?.token}; path=/; SameSite=Lax`; 
        document.cookie = `userId=${response.data?.user?.id}; path=/; SameSite=Lax`; 

      }

    } catch (error: any) {
      if (error.status === 403) {
        setNotVerified(true);
        
      }
      setMessage(String(error.response.data.message));
      setShowAlert(true);
    }
  };


    const verificarUsuario = async (datos: { correo: string; password: string;  pin: string }) => {
    const API_URL_CONFIRM = `api/auth/confirm`;
    setShowAlert(false);

    const { password, ...datosConfirmacion } = datos;
    const { pin, ...datosLogin } = datos;


    try {
      const response = await axios.post(API_URL_CONFIRM, datosConfirmacion);
      if (response.status === 201) {
        loguearUsuario(datosLogin)
      }

    } catch (error: any) {

      setMessage(String(error.response.data.message));
      setShowAlert(true);
    }
  };








  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const datosDeLogin = { correo, password: contrasena };
    loguearUsuario(datosDeLogin);
  };

  const handleVerification = (event: React.FormEvent) => {
    event.preventDefault();
    const datosDeVerificacion = { correo, password: contrasena, pin };
    verificarUsuario(datosDeVerificacion);
  };




  return (
    <Box>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: Global.overlayColor,
          zIndex: Global.zIndexValue,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card sx={{ p: 4, zIndex: Global.zIndexValue + 1, minWidth: 300, position: 'relative' }}>

          {/* Botón cerrar */}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Imagen */}
          <Box sx={Global.Centered}>
            <Box
              component="img"
              src={imageUrl}
              alt="Ícono de Imagen"
              sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', margin: '5px' }}
            />
          </Box>

          {/* Título */}
          <Box sx={Global.Centered}>
            <Typography sx={{ color: '#005a58', fontWeight: "bold", fontSize: "27px" }}>Bienvenido</Typography>
          </Box>

          {/* Formulario */}
          <Box component="form" onSubmit={notVerified ? handleVerification : handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 400, margin: '0 auto' }}>

            <TextField
              required
              label="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <TextField
              required
              label="Contraseña"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />

            {notVerified && (
              <TextField
                required
                label="Pin Institucional"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />

            )


            }

            <Box sx={Global.CenteredNoMargin}>
              {!notVerified && (
                  
                <Button type="submit">
                  <Chip label="INICIAR SESIÓN" sx={Global.ButtonStyle} />
                </Button>


              )}

              {notVerified && (
                  
              <Button type="submit">
                <Chip label="CERTIFICAR CUENTA" sx={Global.ButtonStyle} />
              </Button>


              )}




            </Box>

            {/* ALERT */}
            {showAlert && (
              <Alert severity="info">
                {message}
              </Alert>
            )}
          </Box>

        </Card>
      </Box>
    </Box>
  );
}
