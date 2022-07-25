/* eslint-disable max-len */
import Image from 'next/image';
import {
  Box, Container, Typography, Stack, Divider, Fab, Chip, Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react';

const logoHeightMult = 1.828290175540685;
const width = 64;

function Contact({ icon, label }:{icon: React.ReactNode, label: string}) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      {icon}
      <Typography>
        {label}
      </Typography>
    </Stack>
  );
}

function ListItem({ children }:{children:React.ReactNode}) {
  return (
    <Stack direction="row" spacing={1}>
      <Box sx={{
        backgroundColor: '#333333', height: '2px', width: '12px', marginTop: 1, flexShrink: '0',
      }}
      />
      <Typography>
        {children}
      </Typography>
    </Stack>
  );
}

function Resume() {
  const theme = createTheme({
    palette: {
      primary: { main: '#333333' },
      secondary: { main: '#444444' },
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 10,
      h1: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '2.8rem',
      },
      subtitle1: {
        fontFamily: "'Merriweather', serif",
        fontSize: '1.2rem',
      },
      h2: {
        fontFamily: "'Merriweather', serif",
        fontSize: '1.6rem',
      },
      h3: {
        fontFamily: "'Merriweather', serif",
        fontSize: '1.4rem',
      },
      subtitle2: {
        fontSize: '1.2rem',
      },
      h5: {
        fontFamily: "'Merriweather', serif",
        fontSize: '1.2rem',
        textAlign: 'center',
      },
      h6: {
        fontFamily: "'Merriweather', serif",
        fontSize: '1rem',
        textAlign: 'center',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        sx={{
          display: 'flex', alignItems: 'stretch', minHeight: '100vh', backgroundColor: 'rgba(255,255,255,0.95)',
        }}
      >
        <Paper
          square
          elevation={24}
          sx={{
            backgroundColor: '#333333',
            padding: 2,
            color: 'rgba(255,255,255,0.87)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Image src="/logoWhite.svg" width={width} height={width * logoHeightMult} alt="logo" />
          </Box>
          <Stack spacing={1} sx={{ height: `calc(100% - ${width * logoHeightMult}px)`, justifyContent: 'space-evenly' }}>
            <Typography sx={{ width: '175px', textAlign: 'justify' }}>
              Full Stack developer with an eye for design who specializes in startups with stacks featuring React. Experienced with Typescript and a variety of backends and databases. Machine learning engineer on the side.
            </Typography>
            <Stack spacing={1}>
              <Typography variant="h5">Contact</Typography>
              <Contact icon={<span className="material-icons">phone</span>} label="(650) 866-5531" />
              <Contact icon={<span className="material-icons">email</span>} label="me@simonh.io" />
              <Contact icon={<LinkedInIcon fontSize="large" />} label="linkedin.com/in/simon-lh" />
            </Stack>
            <Stack spacing={1} sx={{ marginBottom: 8 }}>
              <Typography variant="h6">Education</Typography>
              <Chip color="secondary" label="UC San Diego" />
            </Stack>
            <Stack spacing={1} sx={{ marginBottom: 8 }}>
              <Typography variant="h6">Other Skills</Typography>
              <Chip color="secondary" label="French Fluency" />
              <Chip color="secondary" label="3D Modeling" />
              <Chip color="secondary" label="3D Printing" />
              <Chip color="secondary" label="Sculpting" />
              <Chip color="secondary" label="Dance" />
            </Stack>
          </Stack>
        </Paper>
        <Stack sx={{ flex: '1', padding: 2, justifyContent: 'space-evenly' }}>
          <Box>
            <Typography variant="h1">
              Simon Huang
            </Typography>
            <Typography variant="subtitle1">
              Full Stack Developer, Machine Learning Engineer
            </Typography>
            <Typography variant="subtitle1">
              Startup Specialist
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Fab color="primary" size="small">
                <span className="material-icons">work</span>
              </Fab>
              <Typography variant="h2">
                Work
              </Typography>
            </Stack>
            <Box sx={{
              marginLeft: '19px', borderLeft: '2px solid #333333', marginTop: 1, paddingLeft: 1,
            }}
            >
              <Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography variant="h3">HedgehogAI 2021-2022</Typography>
                  <Chip color="secondary" size="small" label="Pytorch" />
                  <Chip color="secondary" size="small" label="NLP" />
                  <Chip color="secondary" size="small" label="SAP Ariba" />
                </Stack>
                <Typography variant="subtitle2">
                  Machine Learning Engineer & Business Administrator
                </Typography>
                <ListItem>
                  Prepared machines and data for machine learning tasks and used them to train models.
                </ListItem>
                <ListItem>
                  Helped develop the demo app which uses a python backend and a React front end.
                </ListItem>
                <ListItem>
                  Performed administrative tasks such as keeping timesheets, managing insurance, and invoicing clients.
                </ListItem>

                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginTop: 2 }}>
                  <Typography variant="h3">Buztubr 2019</Typography>
                  <Chip color="secondary" size="small" label="React" />
                  <Chip color="secondary" size="small" label="React Native" />
                  <Chip color="secondary" size="small" label="Facebook API" />
                </Stack>
                <Typography variant="subtitle2">
                  Senior Software Developer
                </Typography>
                <ListItem>
                  Built the foundation of a full stack app with a B2B and a B2C side as a solo developer.
                </ListItem>
                <ListItem>
                  Lead a team to continue development and growth of the app.
                </ListItem>
                <ListItem>
                  Developed a mobile app using React Native while re-using code from the web app.
                </ListItem>

                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginTop: 2 }}>
                  <Typography variant="h3">Project in a Box 2016-2017</Typography>
                  <Chip color="secondary" size="small" label="React" />
                  <Chip color="secondary" size="small" label="Express" />
                  <Chip color="secondary" size="small" label="MongoDB" />
                </Stack>
                <Typography variant="subtitle2">
                  Co Manager
                </Typography>
                <ListItem>
                  Managed and developed the project in React.
                </ListItem>
                <ListItem>
                  Lead meetings and development and onboarded new hires.
                </ListItem>
              </Stack>
            </Box>
          </Box>

          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Fab color="primary" size="small">
                <span className="material-icons">construction</span>
              </Fab>
              <Typography variant="h2">
                Projects
              </Typography>
            </Stack>
            <Box sx={{
              marginLeft: '19px', borderLeft: '2px solid #333333', marginTop: 1, paddingLeft: 1,
            }}
            >
              <Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography variant="h3">Ranked Poll</Typography>
                  <Chip color="secondary" size="small" label="Next.js" />
                  <Chip color="secondary" size="small" label="GraphQL" />
                  <Chip color="secondary" size="small" label="PostgreSQL" />
                </Stack>
                <Typography variant="subtitle2">
                  rankedpoll.com
                </Typography>
                <Typography>
                  Ranked poll is a web app that simplifies and streamlines creating and voting on ranked polls. The web app obtains a more satisfying result from a group than traditional majority voting.
                </Typography>
                <ListItem>
                  Used Google Ads to obtain initial users with a 22.78% conversion rate. It now has thousands of users without the support of any ads.
                </ListItem>
                <ListItem>
                  Implemented an original version of the Ranked Pairs voting method which is one of the most complex voting methods.
                </ListItem>

                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginTop: 2 }}>
                  <Typography variant="h3">Mastermind Theme</Typography>
                  <Chip color="secondary" size="small" label="Gatsby" />
                  <Chip color="secondary" size="small" label="MUI" />
                  <Chip color="secondary" size="small" label="Typescript" />
                </Stack>
                <Typography variant="subtitle2">
                  mastermindthe.me
                </Typography>
                <Typography>
                  Mastermind Theme grew out of an Avenger-themed implementation of mastermind for a custom group puzzle party game.
                </Typography>
                <ListItem>
                  Implemented a mastermind game with an adversarial solution that has a minimum number of guesses necessary to succeed to normalize the expected completion time.
                </ListItem>
                <ListItem>
                  Designed a Sci-Fi front end based on a screenshot from a hacking scene in a Marvel movie.
                </ListItem>
              </Stack>
            </Box>
          </Box>
          <Typography>This resume was made with React, MUI, and Typescript.</Typography>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default Resume;
