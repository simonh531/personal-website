import React, {
  useState, useEffect, useRef, forwardRef,
} from 'react';
import Image from 'next/image';
import {
  Typography, Box, Card, Grid, Container, Stack, IconButton, Paper,
  CardHeader, CardMedia, CardActionArea, CardActions, Avatar, Button, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ContentfulPortfolioEntry, Picture } from '../utils/contentful';
import style from '../styles/contentfulStyle';

// eslint-disable-next-line react/display-name
const Content = forwardRef(({
  item, pictures, height, useTransition, setUnfocused,
}:{
  item: ContentfulPortfolioEntry
  pictures: Picture[]
  height?: string
  useTransition?: boolean
  setUnfocused?: () => void
}, ref) => {
  const {
    name, url, iconLink, description,
  } = item.fields;
  const {
    width: firstWidth,
    height: firstHeight,
  } = pictures[0].fields.file.details.image;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [hoverScreenShotIndex, setHoverScreenShotIndex] = useState(-1);

  const pictureSelector = ({ fields }:{ fields: Picture['fields']}, index:number) => (
    <Card key={fields.file.url} sx={{ backgroundColor: 'transparent' }}>
      <CardActionArea
        onClick={() => setScreenshotIndex(index)}
        onMouseEnter={() => setHoverScreenShotIndex(index)}
        onMouseLeave={() => setHoverScreenShotIndex(-1)}
        sx={{
          height: {
            xs: '30px',
            sm: '100px',
          },
          width: {
            xs: `${(firstWidth / firstHeight) * 30}px`,
            sm: `${(firstWidth / firstHeight) * 100}px`,
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

  const pictureIndex = hoverScreenShotIndex === -1 ? screenshotIndex : hoverScreenShotIndex;

  return (
    <Box
      sx={{
        height,
        width: '100%',
        overflow: 'hidden',
        position: 'absolute',
        left: '0',
        backdropFilter: 'contrast(60%) brightness(30%) blur(2px)',
        color: 'rgba(255,255,255,0.87)',
        transition: useTransition ? 'height 0.2s' : '',
        opacity: !setUnfocused ? '0' : '1', // is dummy component
        pointerEvents: !setUnfocused ? 'none' : 'auto',
      }}
      ref={ref}
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
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Avatar
              src={iconLink || '/apple-touch-icon.png'}
              variant="rounded"
              sx={{
                backgroundColor: '#888888',
                boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
              }}
            />
            <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', sm: '2rem' } }}>
              {name}
            </Typography>
          </Stack>
          <Button
            size="large"
            color="primary"
            sx={{ textTransform: 'none', color: 'rgba(255,255,255,0.87)', alignSelf: 'flex-start' }}
            component="a"
            href={`https://${url}`}
          >
            <span className="material-icons">link</span>
            {url}
          </Button>
          <Stack direction={isXs ? 'column' : 'row'} spacing={1}>
            <Stack spacing={1} direction={isXs ? 'row' : 'column'}>
              {pictures.map(pictureSelector)}
            </Stack>
            <Box sx={{
              flex: '1', position: 'relative', display: 'flex', justifyContent: 'center',
            }}
            >
              <Box sx={{ width: '100%', maxWidth: `${(firstWidth / firstHeight) * 400}px` }}>
                <Image
                  width={firstWidth}
                  height={firstHeight}
                  src={`https:${pictures[pictureIndex].fields.file.url}`}
                  layout="responsive"
                  alt={pictures[pictureIndex].fields.title}
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
  );
});

export default function PortfolioCard({
  item, pictures, focused, setFocused, setUnfocused, useTransition,
}:{
  item: ContentfulPortfolioEntry
  pictures: Picture[]
  focused: boolean
  setFocused: () => void
  setUnfocused: () => void
  useTransition: boolean
}) {
  const {
    name, url, iconLink,
  } = item.fields;
  const {
    width: firstWidth,
    height: firstHeight,
  } = pictures[0].fields.file.details.image;
  const dummyRef = useRef<HTMLDivElement>(null);

  const [openingHeight, setOpeningHeight] = useState(0);
  useEffect(() => {
    if (focused && dummyRef?.current?.clientHeight) {
      setOpeningHeight(dummyRef.current.clientHeight);
    } else {
      setOpeningHeight(0);
    }
  }, [focused, firstWidth, firstHeight]);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Content item={item} pictures={pictures} ref={dummyRef} />
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
                avatar={(
                  <Paper sx={{ backgroundColor: '#888888' }}>
                    <Avatar
                      src={iconLink || '/apple-touch-icon.png'}
                      variant="rounded"
                    />
                  </Paper>
                )}
                title={name}
                titleTypographyProps={{
                  variant: 'h3',
                  sx: { fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' } },
                }}
              />
              <CardMedia sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#888888' }}>
                <Box sx={{ height: '100%', width: `${Math.min(100, (firstWidth / firstHeight) * 100)}%` }}>
                  <Image
                    width={firstWidth}
                    height={firstHeight}
                    src={`https:${pictures[0].fields.file.url}`}
                    layout="responsive"
                    alt={pictures[0].fields.title}
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
        <Content
          item={item}
          pictures={pictures}
          height={`${openingHeight}px`}
          useTransition={useTransition}
          setUnfocused={setUnfocused}
        />
        <Box sx={{ height: openingHeight, transition: useTransition ? 'height 0.2s' : '' }} />
      </Box>
    </Grid>
  );
}
