import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface Picture {
  fields: {
    title: string
    file: {
      details: {
        image: {
          width: number
          height: number
        }
      }
      url: string
    }
  }
}

export interface ContentfulPortfolioEntry {
  fields: {
    name: string,
    url: string,
    order: number
    web: boolean,
    mobile: boolean,
    iconLink: string,
    picture: Picture[],
    mobileScreenshot: Picture[],
    description: Document,
    tech: string[],
  }
}

const params:{ accessToken: string, space: string, host?: string} = {
  accessToken: '',
  space: '',
};
if (
  process.env.CONTENTFUL_SPACE_ID
  && process.env.CONTENTFUL_ACCESS_TOKEN
) {
  params.accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  params.space = process.env.CONTENTFUL_SPACE_ID;
}
if (process.env.NODE_ENV === 'development') {
  params.host = 'preview.contentful.com';
}

export default createClient(params);
