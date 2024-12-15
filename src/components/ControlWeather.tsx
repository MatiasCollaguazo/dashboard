import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

interface ControlWeatherProps {
  selectedCategory: string;
  onCategoryChange: (event: SelectChangeEvent) => void;
}

export default function ControlWeather({ selectedCategory, onCategoryChange }: ControlWeatherProps) {
  const items = [
    { visibleName: 'Precipitacion', name: 'precipitation', description: 'Cantidad de agua que cae sobre una superficie en un período específico.' },
    { visibleName: 'Humedad', name: 'humidity', description: 'Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.' },
    { visibleName: 'Nubosidad', name: 'clouds', description: 'Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.' },
  ];

  const options = items.map((item) => (
    <MenuItem key={item.name} value={item.name}>
      {item.visibleName.charAt(0).toUpperCase() + item.visibleName.slice(1)}
    </MenuItem>
  ));

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
      </Typography>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Variables</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={selectedCategory}
            onChange={onCategoryChange}
          >
            <MenuItem value="" disabled>
              Seleccione una variable
            </MenuItem>
            {options}
          </Select>
        </FormControl>
      </Box>

      <Typography mt={2} component="p" color="text.secondary">
        {items.find((item) => item.name === selectedCategory)?.description || 'Seleccione una categoría'}
      </Typography>
    </Paper>
  );
}
