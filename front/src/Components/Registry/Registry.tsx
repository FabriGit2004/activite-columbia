import { Box, Card, Typography, IconButton, TextField, Button, Chip, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Global } from '../../global'

import { useState } from 'react';
import axios from 'axios';



interface props {
  onClose: () => void;
  openDashboard: () => void;
}


export default function BackgroundOverlay({ onClose, openDashboard }: props) {

  const imageUrl = '/lc.svg';


  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombreApellido, setNombreApellido] = useState('');

  const [message, setMessage] = useState('');


  const [showAlert, setShowAlert] = useState(false);
  const [messageType , setMessageType] = useState('')



  const registrarUsuario = async (datos: { nombre: string; correo: string; password: string; }) => {

    const API_URL_REGISTER = `api/auth/register`;

    try {
      const response = await axios.post(API_URL_REGISTER, datos);

      if (response.status === 201) {
        setMessage("Usuario registrado favor iniciar sesión y certificar cuenta")
        setShowAlert(true);
        setMessageType('success')
      }


    } catch (error: any) {

      setShowAlert(true);
      setMessage(String(error.response.data.message));
      setMessageType('error')

    }
  };


  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const datosDeRegistro = {

      nombre: nombreApellido,
      correo: correo,
      password: contrasena,

    };
    registrarUsuario(datosDeRegistro);
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

          <Box sx={{ marginBottom: '30px' }}>
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
          </Box>

          <Box sx={Global.Centered}>
            <Box
              component="img"
              src={imageUrl}
              alt="Ícono de Imagen"
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: '50%',
                margin: '5px'
              }}
            />
          </Box>

          <Box sx={Global.Centered}>
            <Typography sx={{ color: '#005a58', fontWeight: "Bold", fontSize: "27px" }}>Bienvenido</Typography>
          </Box>


          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 400, margin: '0 auto' }}>

            {!showAlert && (<>

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
                helperText="Usa 8 o más letras, números y símbolos"
              />


              <TextField
                required
                label="Nombre y Apellido"
                value={nombreApellido}
                onChange={(e) => setNombreApellido(e.target.value)}
              />

              <Box sx={Global.CenteredNoMargin}>
                <Button type="submit"><Chip label="CREAR CUENTA" sx={Global.ButtonStyle}></Chip></Button>
              </Box>
            </>



            )}



            {showAlert && (

              <Alert severity={messageType === "success" ? "success" : "error"}>
                {message}
              </Alert>



            )}


          </Box>

        </Card>
      </Box>





    </Box>
  );
}