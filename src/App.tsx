import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import useWeatherData from "./hooks/useWeatherData";
import IndicatorWeather from "./components/IndicatorWeather";
import TableWeather from "./components/TableWeather";
import LineChartWeather from "./components/LineChartWeather";
import ControlWeather from "./components/ControlWeather";
import Header from "./components/Header";

function App() {
  const [ city, setCity ] = useState("Guayaquil");
  const { indicators, items } = useWeatherData(city, "EC");
  const [selectedCategory, setSelectedCategory] = useState("precipitation");


  // Función para manejar el cambio de categoría
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  // Mapea los datos de acuerdo a la categoría seleccionada
  const xLabels = items.map((item) => item.dateStart); // Fechas
  const dataSeries = [
    {
      data: items.map((item) => Number(item[selectedCategory] || 0)), // Valores de la categoría
      label: selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1), // Capitaliza la categoría
    },
  ];


  const renderIndicators = () => (
    <Grid container spacing={3} style={{ marginBottom: "20px" }}>
      {indicators.map((indicator, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
          <IndicatorWeather
            title={indicator.title}
            subtitle={indicator.subtitle}
            value={indicator.value}
          />
        </Grid>
      ))}
    </Grid>
  );

  const handleSearch = (value: string) => {
    setCity(value);
  };

  return (
    <Grid container spacing={3} style={{ padding: "90px 0px 0px 24px" }}>
      <Grid container spacing={0}>
        {/* Header */}
        <Grid item xs={12}>
          <Header
            title="Weather Dashboard"
            onMenuClick={() => console.log("Menu opened")}
            onSearch={handleSearch}
          />
        </Grid>
      </Grid>

      {/* Indicadores */}
      <Grid item xs={12}>
        {renderIndicators()}
      </Grid>

      {/* Controles y Tablas */}
      <Grid item xs={12} md={6}>
        <ControlWeather 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <TableWeather itemsIn={items} />
      </Grid>

      {/* Gráfica */}
      <Grid item xs={12} md={6}>
      <LineChartWeather 
        dataSeries={dataSeries} 
        xLabels={xLabels} 
      />
      </Grid>
    </Grid>
  );
}

export default App;
