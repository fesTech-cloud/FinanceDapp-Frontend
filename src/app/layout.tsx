// src/app/layout.tsx
"use client"
import type { NextComponentType, NextPage, NextPageContext } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { themeSettings } from './theme/theme';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './state/api';

const inter = Inter({ subsets: ['latin'] });

// Create the Redux store
const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

// Define the layout component
const theme = createTheme(themeSettings);

interface LayoutProps {
  children?: React.ReactNode;
}

const RootLayout: NextComponentType<NextPageContext, LayoutProps, LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" p="1rem 2rem 4rem 2rem">
          <Provider store={store}>
            <body className={inter.className}>{children}</body>
          </Provider>
        </Box>
      </ThemeProvider>
    </html>
  );
};

// Export the layout component as a NextPage
const Layout: NextPage = RootLayout;
export default Layout;
