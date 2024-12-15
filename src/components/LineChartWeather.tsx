import Paper from "@mui/material/Paper";
import { LineChart } from "@mui/x-charts/LineChart";

interface LineChartWeatherProps {
  dataSeries: { data: number[]; label: string }[];
  xLabels: string[];
}

export default function LineChartWeather({ dataSeries, xLabels }: LineChartWeatherProps) {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "auto",
      }}
    >
      <LineChart
        width={650}
        height={350}
        series={dataSeries}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </Paper>
  );
}
