import React, { useState } from 'react';
import Image from 'next/image';
import {
  Typography, Box, Card, Grid, Container, Stack, IconButton,
  CardHeader, CardMedia, CardActionArea, CardActions, Avatar, Button, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ContentfulPortfolioEntry, Picture } from '../utils/contentfulDefs';
import style from '../styles/contentfulStyle';

export default function PortfolioCard({
  item, isMobile, focused, setFocused, setUnfocused,
}:{
  item: ContentfulPortfolioEntry
  isMobile: boolean
  focused: boolean
  setFocused: () => void
  setUnfocused: () => void
}) {
  const {
    name, url, iconLink, picture, mobileScreenshot, description,
  } = item.fields;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const openingHeight = focused ? '600px' : '0px';
  const pictureSelector = ({ fields }:{ fields: Picture['fields']}, index:number) => (
    <Card square key={fields.file.url} sx={{ backgroundColor: 'transparent' }}>
      <CardActionArea
        onClick={() => setScreenshotIndex(index)}
        sx={{
          height: {
            xs: '30px',
            sm: '100px',
          },
          width: {
            xs: `${(isMobile ? 390 / 844 : 1920 / 1080) * 30}px`,
            sm: `${(isMobile ? 390 / 844 : 1920 / 1080) * 100}px`,
          },
          opacity: screenshotIndex === index ? '1' : '0.5',
          '&:hover': {
            opacity: '0.8',
          },
        }}
      >
        <Image
          src={`https:${fields.file.url}`}
          layout="fill"
          alt={fields.title}
        />
      </CardActionArea>
    </Card>
  );
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box>
        <Box sx={{ position: 'relative', paddingBottom: 2 }}>
          <Box sx={{
            backgroundColor: '#eeeeee',
            position: 'absolute',
            top: '-16px',
            left: '-100vw',
            right: '-100vw',
            bottom: '0px',
            zIndex: '-1',
          }}
          />
          <Card sx={{ zIndex: '1' }} elevation={3}>
            <CardActionArea onClick={focused ? setUnfocused : setFocused}>
              <CardHeader
                avatar={iconLink ? (
                  <Avatar
                    src={iconLink}
                    variant="rounded"
                    sx={{
                      backgroundColor: '#888888',
                      boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
                    }}
                  />
                ) : null}
                title={name}
                titleTypographyProps={{
                  variant: 'h5',
                }}
              />
              <CardMedia sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#888888' }}>
                <Box sx={{ height: '100%', width: isMobile ? `${(390 / 1920) * 100}%` : '100%' }}>
                  <Image
                    width={isMobile ? 390 : 1920}
                    height={isMobile ? 844 : 1080}
                    src={`https:${isMobile
                      ? mobileScreenshot[0].fields.file.url
                      : picture[0].fields.file.url
                    }`}
                    layout="responsive"
                    alt={picture[0].fields.title}
                  />
                </Box>
              </CardMedia>
            </CardActionArea>
            {url ? (
              <CardActions>
                <Button size="small" color="primary" sx={{ textTransform: 'none' }} component="a" href={`https://${url}`}>
                  <span className="material-icons">link</span>
                  {url}
                </Button>
              </CardActions>
            ) : null }
          </Card>
        </Box>
        <Box sx={{
          height: openingHeight,
          width: '100%',
          overflow: 'hidden',
          position: 'absolute',
          left: '0',
          backdropFilter: 'contrast(60%) brightness(30%) blur(2px)',
          color: 'rgba(255,255,255,0.87)',
        }}
        >
          <Container
            maxWidth="md"
            sx={{
              paddingTop: 2, paddingBottom: 2, position: 'relative', height: '100%',
            }}
          >
            <IconButton
              onClick={setUnfocused}
              size="large"
              sx={{
                position: 'absolute', top: '8px', right: '8px', color: 'white',
              }}
            >
              <span className="material-icons">close</span>
            </IconButton>
            <Stack spacing={1} sx={{ height: '100%' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 2 }}>
                {iconLink ? (
                  <Avatar
                    src={iconLink}
                    variant="rounded"
                    sx={{
                      backgroundColor: '#888888',
                      boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
                    }}
                  />
                ) : null }
                <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', sm: '2rem' } }}>
                  {name}
                </Typography>
              </Stack>
              <Stack direction={isXs ? 'column' : 'row'} spacing={1}>
                <Stack spacing={1} direction={isXs ? 'row' : 'column'}>
                  {isMobile ? mobileScreenshot.map(pictureSelector) : picture.map(pictureSelector)}
                </Stack>
                <Box sx={{
                  flex: '1', position: 'relative', display: 'flex', justifyContent: 'center',
                }}
                >
                  <Box sx={{ height: '100%', width: isMobile ? `${(390 / 1920) * 100}%` : '100%' }}>
                    <Image
                      width={isMobile ? 390 : 1920}
                      height={isMobile ? 844 : 1080}
                      src={`https:${isMobile
                        ? mobileScreenshot[screenshotIndex].fields.file.url
                        : picture[screenshotIndex].fields.file.url
                      }`}
                      layout="responsive"
                      alt={picture[screenshotIndex].fields.title}
                    />
                  </Box>
                </Box>
              </Stack>
              {documentToReactComponents(description, style)}
              {/* <Typography sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
              </Typography> */}
            </Stack>
          </Container>
        </Box>
        <Box sx={{ height: openingHeight, transition: 'height 0.2s' }} />
      </Box>
    </Grid>
  );
}
