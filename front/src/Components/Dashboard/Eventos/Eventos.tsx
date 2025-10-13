import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import axios from 'axios';

// 🧩 Tipo de datos del evento
interface Event {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  fechaDeEnvio: string;
  usuarioId: number;
}

// 🧩 DTO de creación (sin ID)
interface CreateEventDto {
  titulo: string;
  fecha: string;
  lugar: string;
  fechaDeEnvio: string;
  usuarioId: number;
}



 const obtenerCookie = (nombre: string) => {
    // Escapa el nombre para usarlo en la expresión regular
    const nameEQ = nombre + "=";
    
    // Divide el string de cookies en un array de cookies individuales
    const ca = document.cookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        
        // Elimina los espacios en blanco al inicio (common issue)
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        
        // Verifica si la cookie comienza con el nombre buscado
        if (c.indexOf(nameEQ) === 0) {
            // Devuelve el valor (la parte restante después del nombre=)
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
  };




const EventsTable: React.FC = () => {

  const API_URL_EVENTS = `api/events`; // Cambiar según tu backend

  const [rows, setRows] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [idUsuario, setIdUsuario] = useState<number | null>(parseInt(obtenerCookie('userId')));
  const [newEvent, setNewEvent] = useState<CreateEventDto>({

    titulo: '',
    fecha: '',
    lugar: '',
    fechaDeEnvio: '',
    usuarioId: idUsuario ?? 0,
  });

  

  // 📦 Obtener todos los eventos
  const fetchEvents = async () => {

    const userId = obtenerCookie('userId');
    setIdUsuario(parseInt(userId ?? ''))

    try {
      const { data } = await axios.get<Event[]>(`${API_URL_EVENTS}/${userId}`);
      setRows(data);
    } catch (err) {
      console.error('Error al cargar los eventos', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🗑️ Eliminar evento
  const handleDelete = async (id: number) => {

    try {
      await axios.delete(`${API_URL_EVENTS}/${id}`);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Error al eliminar el evento', err);
    }
  };

  // ➕ Crear evento
  const handleCreate = async () => {
    try {
      const { data } = await axios.post<Event>(API_URL_EVENTS, newEvent);
      setRows((prev) => [...prev, data]);
      setOpen(false);
      setNewEvent({
        titulo: '',
        fecha: '',
        lugar: '',
        fechaDeEnvio: '',
        usuarioId:idUsuario ?? 0,
      });
    } catch (err) {
      console.error('Error al crear el evento', err);
    }
  };

  // 📋 Definición de columnas
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'titulo', headerName: 'Título', width: 200 },
    { field: 'fecha', headerName: 'Fecha', width: 150 },
    { field: 'lugar', headerName: 'Lugar', width: 150 },
    { field: 'fechaDeEnvio', headerName: 'Fecha de Envío', width: 150 },
    { field: 'usuarioId', headerName: 'Usuario ID', width: 120 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <h2>Eventos</h2>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Nuevo Evento
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
      />

      {/* Modal para crear evento */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Crear Nuevo Evento</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: 400 }}
        >
          <TextField
            sx={{mt:2}}
            label="Título"
            value={newEvent.titulo}
            onChange={(e) => setNewEvent({ ...newEvent, titulo: e.target.value })}
          />
          <TextField
            label="Fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newEvent.fecha}
            onChange={(e) => setNewEvent({ ...newEvent, fecha: e.target.value })}
          />
          <TextField
            label="Lugar"
            value={newEvent.lugar}
            onChange={(e) => setNewEvent({ ...newEvent, lugar: e.target.value })}
          />
          <TextField
            label="Fecha de Envío"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newEvent.fechaDeEnvio}
            onChange={(e) => setNewEvent({ ...newEvent, fechaDeEnvio: e.target.value })}
          />
          <TextField
            label="Usuario ID"
            type="string"
            disabled={true}
            value={idUsuario}
            onChange={(e) =>
              setNewEvent({ ...newEvent, usuarioId: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreate}>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventsTable;
