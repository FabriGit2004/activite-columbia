import Box from '@mui/material/Box';
import { Global } from '../../../global';
import { Card, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventsTable from '../Eventos/Eventos';
import { useCallback, useState, useEffect } from 'react'; // 👈 Importamos useEffect
import axios from 'axios';

// Definimos una función de error para que el código compile, 
// en un componente real usarías un hook de estado para manejar errores.
function setError(message: string) {
  console.error(message);
}

export default function Inicio() {
  // 1. Estados para almacenar los conteos
  const [subscribersCount, setSubscribersCount] = useState<number | string>('...');
  const [eventsCount, setEventsCount] = useState<number | string>('...');

  const API_URL_SUBSCRIBERS_COUNT = `api/subscribers/count`;
  const API_URL_EVENTS_COUNT = `api/events/count`;

  // 2. Funciones de obtención de datos (sin cambios, son correctas)
  const fetchSubscribers = useCallback(async () => {
      try {
        const { data } = await axios.get(`${API_URL_SUBSCRIBERS_COUNT}`);
        // Asume que el backend devuelve { total: '123' }
        setSubscribersCount(parseInt(data.total)); 
      } catch (err) {
        setError('Error al obtener la cuenta de suscriptores.');
        setSubscribersCount('Error'); // Muestra un mensaje de error en la UI
      } 
    }, [API_URL_SUBSCRIBERS_COUNT]);


  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL_EVENTS_COUNT}`);
      // Asume que el backend devuelve { total: '123' }
      setEventsCount(parseInt(data.total));
    } catch (err) {
      setError('Error al obtener la cuenta de eventos.');
      setEventsCount('Error'); // Muestra un mensaje de error en la UI
    } 
  }, [API_URL_EVENTS_COUNT]);

  // 3. Ejecutar las funciones al montar el componente (useEffect)
  useEffect(() => {
    fetchSubscribers();
    fetchEvents();
  }, [fetchSubscribers, fetchEvents]); // Dependencias para evitar reejecuciones innecesarias

  // 4. cardData utiliza los estados
  const cardData = [
    // Usamos el estado 'eventsCount' para "Eventos Activos" (Asumiendo que es el count)
    { title: "Eventos Activos Global", value: eventsCount }, 
    // Usamos el estado 'subscribersCount' para "Total de Alumnos"
    { title: "Total de Alumnos Global", value: subscribersCount }, 
  ];

  const getIconForIndex = (index: number) => {
    switch (index) {
      case 0:
        return <DateRangeIcon fontSize="large" sx={{ verticalAlign: 'middle', m: 2, color: 'primary.main' }} />;
      case 1:
        return <AccountBoxIcon fontSize="large" sx={{ verticalAlign: 'middle', m: 2, color: 'success.main' }} />;
      default:
        return null; 
    }
  };


  return (

    <>

      <Box
        sx={[
          Global.Rows,
          Global.Centered,
          Global.CardWithBorderToSons
        ]}
      >
        {cardData.map((data, index) => (
          <Card key={index} sx={{ padding: 2, minWidth: 150, textAlign: 'center' }}>
            <Typography variant="body1" color="text.primary" fontWeight={"bold"}>
              {data.title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {/* 5. Simplemente renderizamos el valor del estado */}
              {data.value}
              {getIconForIndex(index)}
            </Typography>
          </Card>
        ))}
      </Box>


      {/* DATA */}

      <EventsTable></EventsTable>


    </>

  );
}