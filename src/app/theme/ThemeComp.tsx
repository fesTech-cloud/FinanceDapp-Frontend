"use client"
import {createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { themeSettings } from "./theme";

export default function ThemeComp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme(themeSettings)
 
  return (
     <ThemeProvider theme={theme}>
        {children}
     </ThemeProvider>
  )
}
