import './App.css'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import IndicatorWeather from './components/IndicatorWeather';
import LineChartWeather from './components/LineChartWeather';
import Grid from '@mui/material/Grid2'; // Grid version - 2

function App() {
  return (
    <Grid container spacing={5}>
        
        {/* Indicadores */}
        <Grid item xs={3}>
            <IndicatorWeather title={'Indicator 1'} subtitle={'Unidad 1'} value={"1.23"} />
        </Grid>

        <Grid item xs={3}>
            <IndicatorWeather title={'Indicator 2'} subtitle={'Unidad 2'} value={"3.12"} />
        </Grid>
        
        <Grid item xs={3}>
            <IndicatorWeather title={'Indicator 3'} subtitle={'Unidad 3'} value={"2.31"} />
        </Grid>
        
        <Grid item xs={3}>
            <IndicatorWeather title={'Indicator 4'} subtitle={'Unidad 4'} value={"3.21"} />
        </Grid>


        {/* Tabla */}
        <Grid item xd xs={3}>
              
            {/* Grid Anidado */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, xl: 3 }}>
                    <ControlWeather/>
                </Grid>
                <Grid size={{ xs: 12, xl: 9 }}>
                    <TableWeather/>
                </Grid>
            </Grid>

        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, xl: 4 }}>
            <LineChartWeather/>
        </Grid>
    </Grid>
  );

}

export default App