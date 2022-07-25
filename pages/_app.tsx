// import '../styles/globals.css';
import React, { useState, useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, Button, IconButton, CssBaseline, styled, Typography,
} from '@mui/material';
import {
  lightGreen, blueGrey, blue,
} from '@mui/material/colors';
// import SettingsIcon from '@mui/icons-material/Settings';
import { setupNeurons, renderStep, StepParameters } from 'abstract-designs/neurons';
import logo from '../public/logo.svg';

declare module '@mui/material/styles' {
  interface Theme {
    glass: {
      primary: string
    }
  }
  // // allow configuration using `createTheme`
  interface ThemeOptions {
    glass?: {
      primary?: string
    }
  }
}

const NavIconButton = styled(IconButton)({
  '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
});

const NavButton = styled(Button)({
  '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
});

const NavA = styled('a')({
  color: 'inherit',
  textDecoration: 'none',
  textTransform: 'none',
});

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: lightGreen[700],
    },
    background: {
      // paper: 'rgba(255,255,255,0.95)',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

const Background = styled('canvas')({
  zIndex: '-1', // not sure why this is necessary?
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  backgroundColor: blueGrey[900],
});

function MyApp({ Component, pageProps }: AppProps) {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [stepParameters, setStepParameters] = useState<StepParameters>();
  const animationFrameIdRef = useRef(0);
  const lastTimeRef = useRef(0);
  useEffect(() => {
    if (canvasRef.current) { // runs twice for some reason so check ready
      const [setup, parameters] = setupNeurons(
        theme.palette.primary.main,
        theme.palette.secondary.main,
        200,
        100,
        10000,
        20000,
        {
          canvas: canvasRef.current,
          designType: 'triangle',
        },
      );
      setStepParameters(parameters);
      setup();
      window.addEventListener('resize', setup);
      return () => {
        window.removeEventListener('resize', setup);
      };
    }
    return () => { /* do nothing */ };
  }, []);

  useEffect(() => {
    if (stepParameters) {
      const step = (time: number) => {
        if (!lastTimeRef.current) {
          lastTimeRef.current = time;
        }
        renderStep(Math.min(time - lastTimeRef.current, 100), 5000, stepParameters);
        lastTimeRef.current = time;
        animationFrameIdRef.current = requestAnimationFrame(step);
      };
      animationFrameIdRef.current = requestAnimationFrame(step);
      return () => {
        cancelAnimationFrame(animationFrameIdRef.current);
      };
    }
    return () => { /* do nothing */ };
  }, [stepParameters]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}
      >
        <Background ref={canvasRef} />
        <AppBar
          position="relative"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }}
        >
          <Toolbar>
            <NavIconButton>
              <Image
                src={logo}
                alt="SH"
                height={40}
                width={40}
              />
            </NavIconButton>
            <Box sx={{ flexGrow: 1 }}>
              <NavButton color="inherit" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                <Link href="/">
                  <NavA>Simon H</NavA>
                </Link>
              </NavButton>
              {/* <NavButton color="inherit">
                <Link href="/about">
                  <NavA>About</NavA>
                </Link>
              </NavButton> */}
            </Box>
            <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>me@simonh.io</Typography>
            {/* <NavButton color="inherit">Login</NavButton>
            <NavIconButton aria-label="delete">
              <SettingsIcon htmlColor="rgba(0,0,0,0.4)" />
            </NavIconButton> */}
          </Toolbar>
        </AppBar>
        <Box sx={{ overflowY: 'scroll', flex: '1' }}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
          <Box sx={{
            padding: 4,
            backgroundColor: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(2px)',
          }}
          >
            Contact: me@simonh.io
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default MyApp;
