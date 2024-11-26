import Grid from '@mui/material/Grid';
import IndicatorWeather from './components/IndicatorWeather';
import ControlWeather from './components/ControlWeather';
import TableWeather from './components/TableWeather';
import LineChartWeather from './components/LineChartWeather';

function App() {
  return (
    <Grid container spacing={5}>
      {/* Indicadores */}
      <Grid item xs={12} sm={6} md={3}>
        <IndicatorWeather title="Indicator 1" subtitle="Unidad 1" value="1.23" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <IndicatorWeather title="Indicator 2" subtitle="Unidad 2" value="3.12" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <IndicatorWeather title="Indicator 3" subtitle="Unidad 3" value="2.31" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <IndicatorWeather title="Indicator 4" subtitle="Unidad 4" value="3.21" />
      </Grid>

      {/* Tabla */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={3}>
            <ControlWeather />
          </Grid>
          <Grid item xs={12} xl={9}>
            <TableWeather />
          </Grid>
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid item xs={12} md={4}>
        <LineChartWeather />
      </Grid>
    </Grid>
  );
}

export default App;
