import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Button, Chip } from '@mui/material';
import { Global } from '../../global';
import { useState } from 'react';
import Inicio from './Inicio/Inicio';
import Eventos from './Eventos/Eventos';
import Alumnos from './Alumnos/Alumnos';
import Notificaciones from './Notificaciones/Notificaciones';
import Cuenta from './Cuenta/Cuenta';
import EventsTable from './Eventos/Eventos';

const drawerWidth = 240;

const IconMap = {
  'Inicio': <HomeIcon />,
  'Eventos': <DateRangeIcon />,
  'Alumnos': <GroupsRoundedIcon />,
  'Notificaciones': <NotificationsActiveRoundedIcon />,
  'Mi cuenta': <SwitchAccountRoundedIcon />,
};
type NavKey = keyof typeof IconMap;
const NavItems: NavKey[] = ['Inicio', 'Eventos', 'Alumnos', 'Notificaciones', 'Mi cuenta'];

const VISTAS = {
  INICIO: 'inicio',
  EVENTOS: 'eventos',
  ALUMNOS: 'alumnos',
  NOTIFICACIONES: 'notificaciones',
  MI_CUENTA: 'miCuenta',
  NINGUNA: 'ninguna',
};

const NavToStateMap = {
  'Inicio': VISTAS.INICIO,
  'Eventos': VISTAS.EVENTOS,
  'Alumnos': VISTAS.ALUMNOS,
  'Notificaciones': VISTAS.NOTIFICACIONES,
  'Mi cuenta': VISTAS.MI_CUENTA,
};


function closeSession(){

    window.location.reload();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

}


export default function ClippedDrawer() {

  const [vistaActiva, setVistaActiva] = useState(VISTAS.INICIO);

  const cambiarVista = (nuevaVista: string) => {
    setVistaActiva(nuevaVista);
  };

  const renderizarVista = () => {
    switch (vistaActiva) {
      case VISTAS.INICIO:
        return <Inicio />;
      case VISTAS.EVENTOS:
        return <EventsTable/>;
      case VISTAS.ALUMNOS:
        return <Alumnos />;
      case VISTAS.NOTIFICACIONES:
        return <Notificaciones />;
      case VISTAS.MI_CUENTA:
        return <Cuenta />;
      case VISTAS.NINGUNA:
      default:
        return <p>Selecciona una opción.</p>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#e7e7e7ff' }}>
        <Toolbar>

          <Box sx={{ flexGrow: 1 }}>
            <Box
              component="img"
              src={'/lc.svg'}
              alt="Ícono de Imagen"
              sx={{
                width: 50,
                height: 50,
                objectFit: 'cover',
                borderRadius: '50%',
                margin: '5px'
              }}
            />
          </Box>

          {/* <Button ><Chip label='CREAR EVENTO + ' sx={Global.ButtonStyle}></Chip></Button> */}
          <Button onClick={closeSession} variant="outlined" startIcon={<LogoutRoundedIcon></LogoutRoundedIcon>}>CERRAR SESIÓN</Button>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: "20px" }}>
          <List>
            {NavItems.map((text, index) => (
              <ListItem key={text} disablePadding >
                <ListItemButton
                  onClick={() => cambiarVista(NavToStateMap[text])}
                  selected={NavToStateMap[text] === vistaActiva}
                >
                  <ListItemIcon>
                    {IconMap[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Box sx={{ height: "80vh" }}>

          <Box>
            {renderizarVista()}
          </Box>

        </Box>
      </Box>
    </Box>
  );
}