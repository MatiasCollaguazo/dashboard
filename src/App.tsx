import React, { useState, useEffect } from "react";
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

  const [searchQuery, setSearchQuery] = useState(city);
  const [debouncedSearch, setDebouncedSearch] = useState(city);

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  const xLabels = items.map((item) => item.dateStart);
  const dataSeries = [
    {
      data: items.map((item) => Number(item[selectedCategory] || 0)),
      label: selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
    },
  ];


  const renderIndicators = () => (
    <Grid container spacing={3} style={{ marginBottom: "20px" }}>
      {
        indicators.map((indicator, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
            <IndicatorWeather
              title={indicator.title}
              subtitle={indicator.subtitle}
              value={indicator.value}
              icon={indicator.icon}
            />
          </Grid>
        ))
    }
    </Grid>
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        setDebouncedSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    if (debouncedSearch !== city) {
      setCity(debouncedSearch);
    }
  }, [debouncedSearch, city]);


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
