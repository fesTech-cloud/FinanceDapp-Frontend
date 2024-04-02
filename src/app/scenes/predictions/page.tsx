"use client"
import FlexBetween from "@/app/components/FlexBetween";
import NavBar from "@/app/components/Navbar";
// import FlexBetween from "@/app/components/flexBetween";
import { Box, Typography, useTheme } from "@mui/material";
import Predictions from "@/app/components/Prediction/Prediction";

export default function Prediction() {
  const {palette} = useTheme()
  return (
      <>
          <Predictions />
      </>
  );
}
