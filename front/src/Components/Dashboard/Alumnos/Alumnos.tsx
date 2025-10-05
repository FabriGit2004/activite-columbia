import * as React from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Alumnos() {
  const [rows, setRows] = React.useState([
    { id: 1, name: 'Carlos López', phone: '+595981234567', course: 'Informática' },
    { id: 2, name: 'Ana Gómez', phone: '+595972345678', course: 'Psicología' },
    { id: 3, name: 'Juan Ruiz', phone: '+595961112233', course: 'Diseño' },
  ]);

  const [nbRows, setNbRows] = React.useState(rows.length);

  // Columnas definidas manualmente
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'phone', headerName: 'Teléfono', width: 180 },
    { field: 'course', headerName: 'Curso', width: 200 },
  ];

  // Estado para el formulario de nuevo alumno
  const [newStudent, setNewStudent] = React.useState({
    name: '',
    phone: '+595',
    course: '',
  });

const handleChange = (e : any) => {
  const { name, value } = e.target;

  let newValue = value;

  if (name === 'phone') {
    // Asegurar que siempre empiece con +595
    if (!newValue.startsWith('+595')) {
      newValue = '+595';
    }

    // Eliminar un 0 luego de +595 (ej: +5950XXX → +595XXX)
    if (newValue.startsWith('+5950')) {
      newValue = '+595' + newValue.slice(5);
    }
  }

  setNewStudent((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};

  const handleAddStudent = () => {
    const { name, phone, course } = newStudent;

    if (!name || !phone || !course || phone.length < 8) {
      alert('Por favor completá todos los campos correctamente.');
      return;
    }

    const nextId = rows.length ? rows[rows.length - 1].id + 1 : 1;

    setRows((prev) => [
      ...prev,
      {
        id: nextId,
        name,
        phone,
        course,
      },
    ]);

    setNbRows((prev) => prev + 1);

    // Limpiar el formulario
    setNewStudent({
      name: '',
      phone: '+595',
      course: '',
    });
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        ALUMNOS
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Nombre"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
            size="small"
          />

          <TextField
            label="Teléfono"
            name="phone"
            value={newStudent.phone}
            onChange={handleChange}
            size="small"
          />

          <TextField
            label="Curso"
            name="course"
            value={newStudent.course}
            onChange={handleChange}
            size="small"
            select
            sx={{ width: 180 }}
          >
            <MenuItem value="Informática">Informática</MenuItem>
            <MenuItem value="Psicología">Psicología</MenuItem>
            <MenuItem value="Diseño">Diseño</MenuItem>
          </TextField>

          <Button variant="contained" onClick={handleAddStudent}>
            Agregar Alumno
          </Button>
        </Stack>
      </Box>

      <Box sx={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DataGrid
            rows={rows.slice(0, nbRows)}
            columns={columns}          />
        </div>
      </Box>
    </>
  );
}
