import { ReactNode } from 'react';
import Head from 'next/head';
import { Typography, Container, Paper } from '@mui/material';
import {
  BLOCKS, Block, Inline, Document,
} from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import contentfulClient from '../utils/contentful';

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]:
    (node:Block | Inline, children:ReactNode) => <Typography>{children}</Typography>,
  },
};

export default function About({ text }:{ text:Document }) {
  return (
    <>
      <Head>
        <title>Simon H - About</title>
        <meta name="description" content="About" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Paper sx={{ marginTop: '1em', padding: '1em', bgcolor: 'background.paper' }}>
          <Container>
            <Typography variant="h3">
              About
            </Typography>
            {documentToReactComponents(text, options)}
          </Container>
        </Paper>
      </Container>
    </>
  );
}

export async function getStaticProps(/* context:Record<string, string> */) {
  const entry = await contentfulClient.getEntry('46hMLMsIsR0U13phJhvdV6');
  return {
    props: entry.fields, // will be passed to the page component as props
  };
}
