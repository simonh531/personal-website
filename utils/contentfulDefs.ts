import { Document } from '@contentful/rich-text-types';

export interface Picture {
  fields: {
    title: string
    file: {
      url: string
    }
  }
}

export interface ContentfulPortfolioEntry {
  fields: {
    name: string,
    url: string,
    iconLink: string,
    picture: Picture[],
    mobileScreenshot: Picture[],
    description: Document,
  }
}
