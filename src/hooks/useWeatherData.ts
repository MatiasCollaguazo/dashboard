import { useEffect, useState } from "react";
import Item from "../interface/Item";

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

const useWeatherData = (city: string, countryCode: string) => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = "b14f773a299d15808f31b452ca782b74";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&mode=xml&appid=${API_KEY}`
      );
      const savedTextXML = await response.text();

      // XML Parsing
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      // Indicators
      const dataToIndicators: Indicator[] = [];
      const name = xml.getElementsByTagName("name")[0]?.innerHTML || "";
      dataToIndicators.push({ title: "Location", subtitle: "City", value: name });

      const location = xml.getElementsByTagName("location")[1];
      if (location) {
        const latitude = location.getAttribute("latitude") || "";
        const longitude = location.getAttribute("longitude") || "";
        const altitude = location.getAttribute("altitude") || "";
        dataToIndicators.push(
          { title: "Location", subtitle: "Latitude", value: latitude },
          { title: "Location", subtitle: "Longitude", value: longitude },
          { title: "Location", subtitle: "Altitude", value: altitude }
        );
      }

      setIndicators(dataToIndicators);

      // Items
      const dataToItems: Item[] = [];
      const timeElements = xml.getElementsByTagName("time");
      Array.from(timeElements).forEach((timeElement) => {
        const dateStart = timeElement.getAttribute("from") || "";
        const dateEnd = timeElement.getAttribute("to") || "";
        const precipitation =
          timeElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "";
        const humidity = timeElement.getElementsByTagName("humidity")[0]?.getAttribute("value") || "";
        const clouds = timeElement.getElementsByTagName("clouds")[0]?.getAttribute("all") || "";

        dataToItems.push({ dateStart, dateEnd, precipitation, humidity, clouds });
      });

      setItems(dataToItems);
    };

    fetchWeatherData();
  }, [city, countryCode]);

  return { indicators, items };
};

export default useWeatherData;
