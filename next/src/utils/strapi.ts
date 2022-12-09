import axios from 'axios';
import path from 'path';
import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337/api/';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
export async function getStrapiContent<T>(
    apiPath: string,
    params: Record<string, unknown> = {}
): Promise<T | undefined>  {
    return axios.get<{data: T}>(
        path.join(STRAPI_URL, apiPath) + qs.stringify(params),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
        }
    ).then(({data}) => data.data).catch((e) => {
        console.log(e);
        return undefined;
    });
}

export type GlobalContent = {
    about: AboutContent;
};

export type AboutContent = {
    id: number;
    attributes: {
        aboutText: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};
