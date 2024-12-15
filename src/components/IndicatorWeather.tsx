import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import { ReactNode } from "react";

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
  icon?: string;
  bgColor?: string;
  sx?: SxProps;
}

export default function IndicatorWeather(config: Indicator) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        background: config.bgColor || "linear-gradient(135deg, #f0f4f8, #e0e7ff)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        ...config.sx,
      }}
    >
      {/* Icono opcional */}
      {config.icon && (
        <Box mb={1} color="primary.main">
          {config.icon}
        </Box>
      )}

      {/* Título */}
      <Typography
        component="h2"
        variant="h6"
        fontWeight="bold"
        color="primary.main"
        gutterBottom
        align="center"
      >
        {config.title}
      </Typography>

      {/* Valor principal */}
      <Typography
        component="p"
        variant="h4"
        fontWeight="bold"
        color="text.primary"
        align="center"
      >
        {config.value}
      </Typography>

      {/* Subtítulo */}
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mt: 1 }}
      >
        {config.subtitle}
      </Typography>
    </Paper>
  );
}
