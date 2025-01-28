import { useEffect, useState } from "react";
import Item from "../interface/Item";
import API_KEY from "./config";
interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
  icon?: string;
}

const useWeatherData = (city: string, countryCode: string) => {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&mode=xml&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch weather data");

        const savedTextXML = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        const dataToIndicators: Indicator[] = [];
        const name = xml.getElementsByTagName("name")[0]?.textContent || "";
        dataToIndicators.push({ title: "Ciudad", subtitle: "Location", value: name });

        const location = xml.getElementsByTagName("location")[1];
        if (location) {
          const latitude = location.getAttribute("latitude") || "N/A";
          const longitude = location.getAttribute("longitude") || "N/A";
          const altitude = location.getAttribute("altitude") || "N/A";
          dataToIndicators.push(
            { title: "Latitud", subtitle: "Latitude", value: latitude },
            { title: "Longitud", subtitle: "Longitude", value: longitude },
            { title: "Altitud", subtitle: "Altitude", value: altitude }
          );
        }

        const dataToItems: Item[] = [];
        const timeElements = Array.from(xml.getElementsByTagName("time"));
        timeElements.forEach((timeElement) => {
          const dateStart = timeElement.getAttribute("from") || "";
          const dateEnd = timeElement.getAttribute("to") || "";
          const precipitation = timeElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "0";
          const humidity = timeElement.getElementsByTagName("humidity")[0]?.getAttribute("value") || "N/A";
          const clouds = timeElement.getElementsByTagName("clouds")[0]?.getAttribute("all") || "N/A";

          dataToItems.push({ dateStart, dateEnd, precipitation, humidity, clouds });
        });
        setItems(dataToItems);

        const now = new Date();
        const today = now.toISOString().split("T")[0];
        let closestTimeElement: Element | null = null; // Explicitly defined type here
        let minimumTimeDifference = Number.MAX_SAFE_INTEGER;

        timeElements.forEach((timeElement) => {
          const dateStart = timeElement.getAttribute("from") || "";

          if (dateStart.startsWith(today)) {
            const timeDifference = Math.abs(new Date(dateStart).getTime() - now.getTime());
            if (timeDifference < minimumTimeDifference) {
              closestTimeElement = timeElement;
              minimumTimeDifference = timeDifference;
            }
          }
        });

        if (closestTimeElement !== null) {
          const precipitation =
          (closestTimeElement as Element).getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "0";
          const humidity =
          (closestTimeElement as Element).getElementsByTagName("humidity")[0]?.getAttribute("value") || "N/A";
          const clouds =
          (closestTimeElement as Element).getElementsByTagName("clouds")[0]?.getAttribute("all") || "N/A";
          const visibility =
          (closestTimeElement as Element).getElementsByTagName("visibility")[0]?.getAttribute("value") || "N/A";

          dataToIndicators.push(
            { title: "Precipitación", subtitle: "Precipitation", value: `${parseFloat(precipitation) * 100}%` },
            { title: "Húmedad", subtitle: "Humidity", value: `${humidity}%` },
            { title: "Nubosidad", subtitle: "Cloudiness", value: `${clouds}%` },
            { title: "Visibilidad", subtitle: "Visibility", value: `${visibility} m` }
          );
        }

        setIndicators(dataToIndicators);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city, countryCode]);

  return { indicators, items };
};

export default useWeatherData;
