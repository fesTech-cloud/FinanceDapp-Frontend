"use client"
// import Image from "next/image";
// import styles from "./page.module.css";
import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import FlexBetween from "./FlexBetween"
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Link from "next/link";


export default function NavBar() {
  const {palette} = useTheme()

  const [selected, setSelected] = useState("dashboard")
  return (
      <FlexBetween mb="0.1rem" p="0.5rem 2rem" color={palette.grey[300]}>

        {/* LEFT SIDE */}
          <FlexBetween gap="0.75rem">
            <MonetizationOnIcon sx={{fontSize: "28px"}}/>
            <Typography variant="h4" fontSize="16px" >FinanceDap</Typography>
          </FlexBetween>

          {/* RIGHT SIDE */}
          <FlexBetween gap="0.75rem">
              <Box sx={{"$:hover": {color: palette.primary[100]}}}>
                <Link href="/" 
                onClick={() => setSelected("dashboard")}
                style={{color: selected === "dashboard" ?"inherit" : palette.grey[700],
                textDecoration: "inherit" }}
                >Dashboard</Link>
              </Box>
              <Box sx={{"$:hover": {color: palette.primary[100]}}}>
                <Link href="/scenes/predictions" 
                onClick={() => setSelected("predictions")}
                style={{color: selected === "predictions" ?"inherit" : palette.grey[700],
                textDecoration: "inherit" }}
                >Predictions</Link>
              </Box>
          </FlexBetween>
      </FlexBetween>
  );
}
