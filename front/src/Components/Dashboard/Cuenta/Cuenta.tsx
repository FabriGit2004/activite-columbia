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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function MiCuenta() {
  const [perfil, setPerfil] = React.useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '+595981234567',
  });

  const [editando, setEditando] = React.useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEditar = () => {
    setEditando((prev) => !prev);
  };

  const handleGuardar = () => {
    // Acá podrías hacer una petición a tu backend para guardar cambios
    console.log('Perfil actualizado:', perfil);
    setEditando(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto', mt: 5 }}>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight="bold">
          Mi Cuenta
        </Typography>

        <Divider />

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 64, height: 64 }}>
            {perfil.nombre.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1">{perfil.nombre}</Typography>
            <Typography variant="body2" color="text.secondary">
              {perfil.email}
            </Typography>
          </Box>
        </Stack>

        <Divider />

        <Box>
          <TextField
            fullWidth
            label="Nombre completo"
            name="nombre"
            value={perfil.nombre}
            onChange={handleChange}
            disabled={!editando}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Correo electrónico"
            name="email"
            value={perfil.email}
            onChange={handleChange}
            disabled={!editando}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={perfil.telefono}
            onChange={(e) => {
              // Eliminar un 0 después del +595
              let val = e.target.value;
              if (val.startsWith('+5950')) {
                val = '+595' + val.slice(5);
              }
              setPerfil((prev) => ({ ...prev, telefono: val }));
            }}
            disabled={!editando}
          />
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {editando ? (
            <>
              <Button variant="outlined" onClick={handleToggleEditar}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleGuardar}>
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
