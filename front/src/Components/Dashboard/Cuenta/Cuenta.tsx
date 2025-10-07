import * as React from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Stack,
  Paper,
  Divider,
  CircularProgress, // Para el indicador de carga
  Alert, // Para mostrar errores
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

// --- Tipos para el perfil (ajusta según tu backend) ---
interface PerfilUsuario {
  id?: number;
  nombre: string;
  correo: string; // Tu backend devuelve 'correo'
  telefono: string;
  // Puedes añadir más campos como 'fechaRegistro' si tu backend los devuelve
}

const API_URL = 'http://127.0.0.1:3001/auth/me';

export default function MiCuenta() {
  const [perfil, setPerfil] = React.useState<PerfilUsuario>({
    nombre: '',
    correo: '',
    telefono: '',
  });
  const [editando, setEditando] = React.useState(false);
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Estado temporal para la edición
  const [perfilEditado, setPerfilEditado] = React.useState<PerfilUsuario>(perfil);

  
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
    return null;
};


  // -------------------------------------------------------------------
  // 1. FUNCIÓN PARA CARGAR EL PERFIL (GET /auth/me)
  // -------------------------------------------------------------------
  const fetchPerfil = React.useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      // ⚠️ Obtener el token (asumo que lo guardas en localStorage después del login)
      const token = obtenerCookie('token'); 
      
      if (!token) {
        throw new Error('No se encontró el token de autenticación.');
      }

      const response = await axios.get<PerfilUsuario>(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Envía el token al backend
        },
      });

      // El backend devuelve 'correo', pero tu frontend usa 'email' en el estado inicial.
      // Normalizamos: Asignamos 'correo' a 'email' para los campos
      const data = { 
          ...response.data, 
          email: response.data.correo,
          // Si el teléfono puede ser null en la DB, pon un string vacío por defecto
          telefono: response.data.telefono || '',
      };
      
      setPerfil(data);
      setPerfilEditado(data);
      
    } catch (err: any) {
      console.error('Error al cargar el perfil:', err);
      // Muestra un mensaje de error más amigable
      const msg = err.response?.data?.message || err.message || 'Error desconocido al cargar los datos.';
      setError(msg);
    } finally {
      setCargando(false);
    }
  }, []);

  // 2. Ejecutar la carga al montar el componente
  React.useEffect(() => {
    fetchPerfil();
  }, [fetchPerfil]);
  // -------------------------------------------------------------------
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerfilEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEditar = () => {
    if (editando) {
      // Si cancela, volvemos al perfil original
      setPerfilEditado(perfil);
    }
    setEditando((prev) => !prev);
  };

  const handleGuardar = async () => {
    setError(null);
    setCargando(true);
    try {
        const token = obtenerCookie('token');
        if (!token || !perfilEditado.id) throw new Error('Usuario o token no válido.');

        // Crear objeto de actualización (ajusta según lo que acepta tu backend)
        const updateData = {
            nombre: perfilEditado.nombre,
            correo: perfilEditado.correo,
    
        };
        
        // Petición PATCH/PUT (asumo que tienes /auth/update/:id)
        await axios.patch(`http://127.0.0.1:3001/auth/update/${perfilEditado.id}`, updateData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        // Actualizar el estado original y terminar la edición
        setPerfil(perfilEditado);
        setEditando(false);
        alert('Perfil actualizado con éxito!');
        
    } catch (err: any) {
        console.error('Error al guardar:', err);
        const msg = err.response?.data?.message || 'Error al guardar los cambios.';
        setError(msg);
    } finally {
        setCargando(false);
    }
  };
  
  // Muestra el indicador de carga o error
  if (cargando && !perfil.nombre) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error && !perfil.nombre) {
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
        <Alert severity="error">Error de carga: {error}</Alert>
        <Button onClick={fetchPerfil} sx={{ mt: 2 }}>Reintentar</Button>
      </Box>
    );
  }
  
  // Si los datos están cargados, renderiza el formulario
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto', mt: 5 }}>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight="bold">
          Mi Cuenta
        </Typography>

        {error && <Alert severity="warning">{error}</Alert>}

        <Divider />

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 64, height: 64 }}>
            {perfil.nombre.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1">{perfil.nombre}</Typography>
            <Typography variant="body2" color="text.secondary">
              {perfil.correo}
            </Typography>
          </Box>
        </Stack>

        <Divider />

        <Box>

           <TextField
            fullWidth
            label="MANAGER ID "
            name="nombre"
            value={perfilEditado.id}
            onChange={handleChange}
            disabled={true}
            sx={{ mb: 2 }}
          />


          <TextField
            fullWidth
            label="Nombre completo"
            name="nombre"
            value={perfilEditado.nombre}
            onChange={handleChange}
            disabled={!editando}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Correo electrónico"
            name="correo" // Cambiado de 'email' a 'correo' para coincidir con el backend
            value={perfilEditado.correo}
            onChange={handleChange}
            disabled={!editando}
            sx={{ mb: 2 }}
          />
          {/* <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={perfilEditado.telefono}
            onChange={handleChange} // Simplificado el onChange
            disabled={!editando}
          /> */}
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {editando ? (
            <>
              <Button variant="outlined" onClick={handleToggleEditar} disabled={cargando}>
                Cancelar
              </Button>
              <Button 
                  variant="contained" 
                  onClick={handleGuardar} 
                  disabled={cargando}
                  startIcon={cargando ? <CircularProgress size={20} color="inherit" /> : null}
              >
                Guardar cambios
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleToggleEditar}
            >
              Editar perfil
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}