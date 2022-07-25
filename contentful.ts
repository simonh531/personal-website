import { createClient } from 'contentful';

const params = {
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

export default createClient(params);
