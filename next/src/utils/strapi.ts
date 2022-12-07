import axios from 'axios';
import path from 'path';
import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337/api/';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
export async function getStrapiContent(apiPath: string, params: Record<string, unknown> = {}) {
  console.log(STRAPI_URL+'about');
  const {data} = await axios.get<{data: AboutContent}>(path.join(STRAPI_URL, apiPath) + qs.stringify(params), {     headers: {
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${STRAPI_TOKEN}`,
    },})
  return data.data;
}


export type AboutContent = {
  id: number,
  attributes: {
    aboutText: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }

}