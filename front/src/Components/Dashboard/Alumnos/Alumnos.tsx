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
  Typography,
} from '@mui/material';
import axios from 'axios';

// --- Definiciones de Tipos ---

interface Subscriber {
  id: number; // CLAVE: Debe existir y ser único.
  nombre: string;
  telefono: string;
  email: string | null; // Acepta string o null
  fechaRegistro: string;
  usuarioId: number;
}

interface CreateSubscriberDto {
  usuarioId: number;
  nombre: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
}

const API_URL = 'http://127.0.0.1:3001/subscribers';


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




// --- Componente Principal ---

const SubscribersTable: React.FC = () => {
  const [rows, setRows] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [idUsuario, setIdUsuario] = useState<number | null>(parseInt(obtenerCookie('userId')));
  

  const [telefonoInput, setTelefonoInput] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [newSubscriber, setNewSubscriber] = useState<CreateSubscriberDto>({
    usuarioId: idUsuario ?? 0,
    nombre: '',
    telefono: '+5959',
    email: '',
    fechaRegistro: new Date().toISOString().split('T')[0],
  });







  // Lógica de Carga de Suscriptores (READ)
  const fetchSubscribers = async () => {
    setLoading(true);


    const userId = obtenerCookie('userId');

    try {
      const { data } = await axios.get<Subscriber[]>(`${API_URL}/${userId}`);
      // **IMPORTANTE**: Filtrar filas que no tienen 'id' si la API lo permite, 
      // para evitar errores críticos en DataGrid.
      const validRows = data.filter(row => row.id !== undefined && row.id !== null);
      setRows(validRows);
    } catch (err) {
      console.error('Error al cargar suscriptores:', err);
      // Manejo de errores más amigable
      alert('Error al obtener los datos. Asegúrate de que el backend esté funcionando.');
    } finally {
        setLoading(false);
    }
  };

  // 1. LLAMADA INICIAL A LA API (Solución al "bug" de datos vacíos)
  useEffect(() => {
    try {
      fetchSubscribers();
    } catch (error) {
      alert('Aun no tenemos registros ...')
    }

  }, []); 

  // ... (handleDelete, handleTelefonoChange, handleCreate se mantienen igual o con ligeros ajustes)

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este suscriptor?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Error al eliminar suscriptor', err);
    }
  };

  const handleTelefonoChange = (value: string) => {
    const soloNumeros = value.replace(/\D/g, '');
    if (soloNumeros.startsWith('0')) setTelefonoError('El número no puede comenzar con 0.');
    else setTelefonoError('');

    setTelefonoInput(soloNumeros);
    setNewSubscriber({ ...newSubscriber, telefono: `+5959${soloNumeros}` });
  };

  const handleCreate = async () => {
    if (telefonoError || !newSubscriber.nombre || newSubscriber.usuarioId <= 0) return;
    try {
      const { data } = await axios.post<Subscriber>(API_URL, newSubscriber);
      setRows((prev) => [...prev, data]);
      setOpen(false);
      // Resetear estados del formulario
      setNewSubscriber({
        usuarioId: idUsuario ?? 0, nombre: '', telefono: '+5959', email: '',
        fechaRegistro: new Date().toISOString().split('T')[0],
      });
      setTelefonoInput('');
    } catch (err) {
      console.error('Error al crear suscriptor', err);
    }
  };

  // 2. DEFINICIÓN DE COLUMNAS REFORZADA (Manejo de Nulos)
  const columns: GridColDef<Subscriber>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'telefono', headerName: 'Teléfono', width: 180 },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 220,

    },
    {
      field: 'fechaRegistro',
      headerName: 'Fecha de Registro',
      width: 180,
    },
    {
      field: 'usuarioId',
      headerName: 'Usuario ID',
      width: 130,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
          Eliminar
        </Button>
      ),
    },
  ];

  // --- Renderizado ---
  return (
    <Box sx={{ height: 500, width: '100%', p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h2">Suscriptores</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Nuevo Suscriptor
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading} // Muestra el indicador de carga
        pageSizeOptions={[5, 10]}
        initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
      />

      {/* ... (Tu Dialogo de Creación se mantiene igual) ... */}
      <Dialog open={open} onClose={() => setOpen(false)}>
         <DialogTitle>Crear Nuevo Suscriptor</DialogTitle>
         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: 400 }}>
           <TextField
             label="Nombre"
             value={newSubscriber.nombre}
             onChange={(e) => setNewSubscriber({ ...newSubscriber, nombre: e.target.value })}
             required
           />
           <TextField
             label="Teléfono"
             value={telefonoInput}
             onChange={(e) => handleTelefonoChange(e.target.value)}
             InputProps={{ startAdornment: <span style={{ marginRight: 6 }}>+5959</span> }}
             error={!!telefonoError}
             helperText={telefonoError || 'Ingresa los dígitos después de +5959'}
             required
           />
           <TextField
             label="Email"
             type="email"
             value={newSubscriber.email}
             onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
           />
           <TextField
             label="Fecha de Registro"
             type="date"
             InputLabelProps={{ shrink: true }}
             value={newSubscriber.fechaRegistro}
             onChange={(e) => setNewSubscriber({ ...newSubscriber, fechaRegistro: e.target.value })}
             required
           />
           <TextField
             label="Usuario ID"
             type="number"
             value={idUsuario ?? 0}
             disabled={true}
             onChange={(e) => {
               // Asegura que el valor sea un número (o 0 si está vacío)
               const value = e.target.value;
               setNewSubscriber({ ...newSubscriber, usuarioId: value ? Number(value) : 0 });
             }}
             helperText="ID del usuario propietario del suscriptor (debe ser > 0)"
             required
           />
         </DialogContent>

         <DialogActions>
           <Button onClick={() => setOpen(false)}>Cancelar</Button>
           <Button
             variant="contained"
             onClick={handleCreate}
             disabled={
                 !!telefonoError || 
                 !newSubscriber.nombre || 
                 newSubscriber.usuarioId <= 0 ||
                 !newSubscriber.fechaRegistro
             }
           >
             Crear
           </Button>
         </DialogActions>
       </Dialog>
    </Box>
  );
};

export default SubscribersTable;