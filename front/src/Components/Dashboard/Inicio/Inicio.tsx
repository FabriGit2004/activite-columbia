
import Box from '@mui/material/Box';
import { Global } from '../../../global';
import { Card, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventsTable from '../Eventos/Eventos';



export default function Inicio() {




  const cardData = [
    { title: "Eventos Activos", value: 100 },
    { title: "Confirmaciones Pendientes", value: 100 },
    { title: "Total de Alumnos", value: 100 },
  ];

  const getIconForIndex = (index: any) => {
    switch (index) {
      case 0:
        return <DateRangeIcon fontSize="large" sx={{ verticalAlign: 'middle', m: 2, color: 'primary.main' }} />;
      case 1:
        return <QueryBuilderIcon fontSize="large" sx={{ verticalAlign: 'middle', m: 2, color: 'warning.main' }} />;
      case 2:
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
              {data.value}{getIconForIndex(index)}
            </Typography>
          </Card>
        ))}
      </Box>


      {/* DATA */}

      <EventsTable></EventsTable>


    </>

  );
}