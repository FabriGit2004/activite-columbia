import * as React from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  readOnly: boolean;
}

export default function Eventos({ readOnly }: Props) {
  const [rows, setRows] = React.useState([
    {
      id: 1,
      titulo: 'Conferencia React',
      fecha: '2025-11-10',
      lugar: 'Buenos Aires',
      fechaDeEnvio: '',
    },
    {
      id: 2,
      titulo: 'Webinar de Seguridad',
      fecha: '2025-11-15',
      lugar: 'Online',
      fechaDeEnvio: '2025-11-14',
    },
    {
      id: 3,
      titulo: 'Hackathon Nacional',
      fecha: '2025-12-01',
      lugar: 'Córdoba',
      fechaDeEnvio: '',
    },
  ]);

  const [newEvent, setNewEvent] = React.useState({
    titulo: '',
    fecha: '',
    lugar: '',
    fechaDeEnvio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const addRow = () => {
    const nextId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    const newRow = { id: nextId, ...newEvent };
    setRows((prev) => [...prev, newRow]);
    setNewEvent({ titulo: '', fecha: '', lugar: '', fechaDeEnvio: '' });
  };

  const handleDelete = (idToDelete: number) => {
    setRows((prev) => prev.filter((row) => row.id !== idToDelete));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'titulo', headerName: 'Título del Evento', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', width: 130 },
    { field: 'lugar', headerName: 'Lugar', width: 180 },
    {
      field: 'fechaDeEnvio',
      headerName: 'Fecha de Envío',
      width: 150,
      renderCell: (params: GridRenderCellParams) => params.value || '—',
    },
  ];

  // 👉 Solo si NO es readOnly, agregamos la columna de acciones
  if (!readOnly) {
    columns.push({
      field: 'acciones',
      headerName: '',
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    });
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        EVENTOS
      </Typography>

      {/* 📝 Formulario para agregar eventos (solo si puede editar) */}
      {!readOnly && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Título"
              name="titulo"
              value={newEvent.titulo}
              onChange={handleChange}
              size="small"
            />
            <TextField
              type="date"
              label="Fecha del Evento"
              name="fecha"
              value={newEvent.fecha}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Lugar"
              name="lugar"
              value={newEvent.lugar}
              onChange={handleChange}
              size="small"
            />
            <TextField
              type="date"
              label="Fecha de Envío (opcional)"
              name="fechaDeEnvio"
              value={newEvent.fechaDeEnvio}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" onClick={addRow}>
              Agregar Evento
            </Button>
          </Stack>
        </Box>
      )}

      {/* 📋 Tabla de eventos (siempre visible) */}
      <Box sx={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DataGrid
            rows={rows}
            columns={columns}

          />
        </div>
      </Box>
    </>
  );
}
