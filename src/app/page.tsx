"use client"
// import Image from "next/image";
// import styles from "./page.module.css";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
// import FlexBetween from "./components/flexBetween"
import NarBar from "./components/Navbar"
import DashboardBox from "./components/DashboardBox";
import RowOne from "./components/Rows/Row1";
import RowTwo from "./components/Rows/Row2";
import RowThree from "./components/Rows/Row3";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;




export default function Home() {

  const isAboveMediumScreen = useMediaQuery("(min-width: 1200px)")
  return (
    <>
   <NarBar />
   <Box width="100%" 
   height="100%" 
   display="grid" 
   padding="0rem 0.8rem 0rem 0.8rem"
   gap="1.5rem"
   marginBottom="40rem"
   sx={
    isAboveMediumScreen ? {
    gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
    gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
    gridTemplateAreas:gridTemplateLargeScreens
   } : {
    gridAutoColumns: "1fr",
    gridAutoRows: "80px",
    gridTemplateAreas:gridTemplateSmallScreens
   }
  }
   >
   <RowOne />
   <RowTwo />
   <RowThree /> 
   </Box>
   </>
  );
}
