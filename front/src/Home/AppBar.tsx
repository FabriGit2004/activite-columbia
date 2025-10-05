import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

import Registry from '../Components/Registry/Registry'
import Login from '../Components/Login/Login'


import { useState } from 'react';
import { Global } from '../global';
import Dashboard from '../Components/Dashboard/Dashboard';

export default function FetchAppBar() {

    const [showRegistry, setShowRegistry] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);



    const toggleRegistry = () => {
        setShowRegistry(prev => !prev);
    };

    const toggleLogin = () => {
        setShowLogin(prev => !prev);
    };

    const toggleDashboard = () => {
        setShowDashboard(prev => !prev);
    };


    return (
        <>

            {!showDashboard && (
                <Box
                    sx={{
                        minHeight: '100vh',
                        backgroundImage: 'url(/bg.svg)',
                        backgroundSize: 'cover',        // Cubre todo el Box, recortando si es necesario
                        backgroundRepeat: 'no-repeat',  // Evita que la imagen se repita
                        backgroundPosition: 'center',   // Centra la imagen en el Box
                        backgroundColor: '#005a58', // 👈 Usa un color que combine con tu imagen

                    }}
                >


                    <AppBar sx={{ backgroundColor: '#e7e7e7ff' }}>
                        <Toolbar>


                            <Box sx={{ flexGrow: 1 }}>
                                <Box
                                    component="img"
                                    src={'/lc.svg'}
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

                     

                            <Button onClick={toggleRegistry}><Chip label='REGISTRARSE' sx={Global.ButtonStyle}></Chip></Button>
                            <Button onClick={toggleLogin}><Chip label='INICIAR SESIÓN' sx={Global.ButtonStyle}></Chip></Button>


                        </Toolbar>

                        {showRegistry && (
                            
                            <Registry onClose={toggleRegistry} openDashboard={toggleDashboard} />

                        )}


                        {showLogin && (

                            <Login onClose={toggleLogin} openDashboard={toggleDashboard} />

                        )}



                    </AppBar>




                </Box>
            )}

            {showDashboard && (
                <Box>
                    <Box sx={{ p: 4 }}>
                        <Dashboard />
                    </Box>
                </Box>
            )}


        </>
    );
}