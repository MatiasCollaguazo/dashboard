{/* Hooks */ }
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import IndicatorWeather from './components/IndicatorWeather';
import ControlWeather from './components/ControlWeather';
import TableWeather from './components/TableWeather';
import LineChartWeather from './components/LineChartWeather';
import Item from './interface/Item';


interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
  {/* Variable de estado y función de actualización */ }
  let [indicators, setIndicators] = useState<Indicator[]>([])
  let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))
  let [items, setItems] = useState<Item[]>([]);

  {/* Hook: useEffect */ }
  useEffect(() => {

    let request = async () => {

      {/* Request */ }
      let API_KEY = "b14f773a299d15808f31b452ca782b74"
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      let savedTextXML = await response.text();

      {/* XML Parser */ }
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      {/* Arreglo para agregar los resultados */ }

      let dataToIndicators: Indicator[] = new Array<Indicator>();

      {/* 
         Análisis, extracción y almacenamiento del contenido del XML 
         en el arreglo de resultados
      */}

      let name = xml.getElementsByTagName("name")[0].innerHTML || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name })

      let location = xml.getElementsByTagName("location")[1]

      let latitude = location.getAttribute("latitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

      let longitude = location.getAttribute("longitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

      let altitude = location.getAttribute("altitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

      //console.log( dataToIndicators )
      setIndicators(dataToIndicators)


      let dataToItems: Item[] = [];
      let timeElements = xml.getElementsByTagName("time");

      Array.from(timeElements).forEach((timeElement: Element) => {
        const dateStart = timeElement.getAttribute("from") || "";
        const dateEnd = timeElement.getAttribute("to") || "";
        const precipitation = timeElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "";
        const humidity = timeElement.getElementsByTagName("humidity")[0]?.getAttribute("value") || "";
        const clouds = timeElement.getElementsByTagName("clouds")[0]?.getAttribute("all") || "";

        dataToItems.push({
          dateStart,
          dateEnd,
          precipitation,
          humidity,
          clouds
        });
      });

      setItems(dataToItems);

    }

    request();

  }, [])

  let renderIndicators = () => {
    return (
      <Grid container spacing={3} style={{ marginBottom: "20px" }}>
        {indicators.map((indicator, idx) => (
          <Grid
            item
            key={idx}
            xs={12}  // Ocupa el 100% en pantallas pequeñas
            sm={6}   // Ocupa el 50% en pantallas medianas
            md={4}   // Ocupa el 33.33% en pantallas grandes
            lg={3}   // Ocupa el 25% en pantallas extra grandes
          >
            <IndicatorWeather
              title={indicator["title"]}
              subtitle={indicator["subtitle"]}
              value={indicator["value"]}
            />
          </Grid>
        ))}
      </Grid>
    );
  };



  {/*JSX*/ }
  return (
    <Grid container spacing={0}>
      {/* Indicadores */}
      {/*
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
      */}

      {renderIndicators()}

      {/* Tabla */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={3}>
            <ControlWeather />
          </Grid>
          <Grid item xs={12} xl={9}>
            <TableWeather itemsIn={items} />
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
