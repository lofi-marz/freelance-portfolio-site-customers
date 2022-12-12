import axios from 'axios';
import crypto from 'crypto';
import qs from 'qs';
import { getSpotifyCode, getSpotifyToken } from './strapi';

export type PostTokenResponse = {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token?: string; //We might not get back another refresh token, in which case we should use the same one
};

export type GetAuthorizeResponse = {
    code?: string;
    state: string;
    error?: string;
};

export type SpotifyToken = {
    token: string;
    expiryDate: string;
    refreshToken: string;
}

type Artist = {
    name: string;
};

export type GetCurrentlyPlayingResponse = {
    item: {
        name: string;
        artists: Artist[];
        external_urls: {
            spotify: string;
        };
    };
};

function getRandomChars(minLength: number, maxLength = -1) {
    let chars = '';
    let length: number;
    if (maxLength < 0) {
        length = minLength;
    } else {
        length =
            minLength + Math.floor(Math.random() * (maxLength - minLength));
    }

    for (let i = 0; i < length; i++) {
        chars += Math.floor(Math.random() * 25).toString(26);
    }
    return chars;
}

export let verifier: string | undefined;
let state: string | undefined;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

function getCodeVerifier() {
    //TODO: Does it matter that we aren't including non-alphanumeric chars
    return getRandomChars(43, 128);
}
async function generateCodeChallenge(codeVerifier: string) {
    //Shout outs to https://github.com/tobika/spotify-auth-PKCE-example/blob/main/public/main.js
    const digest = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(codeVerifier)
    );

    return Buffer.from(digest)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export async function getSpotifyAuthLink() {
    const id = process.env.SPOTIFY_CLIENT_ID;

    verifier = getCodeVerifier();
    state = getRandomChars(10);
    console.log('Generating:', verifier);
    const challenge = await generateCodeChallenge(verifier);
    const params = {
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: 'http://localhost:3005/spotify-login',
        state,
        code_challenge_method: 'S256',
        code_challenge: challenge,
        scope: 'user-read-private user-read-currently-playing',
    };
    return 'https://accounts.spotify.com/authorize?' + qs.stringify(params);
}

function parseTokenResponse(res: PostTokenResponse): SpotifyToken {
    const useBy = new Date();
    useBy.setUTCSeconds(useBy.getUTCSeconds() + res.expires_in )
    return {token: res.access_token, expiryDate: useBy.toUTCString(), refreshToken: res.refresh_token ?? ''};
}

export async function getSpotifyTokenFromLogin(
    code: string,
    codeVerifier: string,
    receivedState: string
): Promise<SpotifyToken | undefined> {
    const AUTH_URL = 'https://accounts.spotify.com/api/token';

    if (receivedState != state) return;
    const { data } = await axios.post<PostTokenResponse>(
        AUTH_URL,
        qs.stringify({
            grant_type: 'authorization_code',
            code,
            client_id: CLIENT_ID,
            code_verifier: codeVerifier,
            redirect_uri: 'http://localhost:3005/spotify-login',
        }),

        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString(
                        'base64'
                    ),
            },
        }
    );
    return parseTokenResponse(data);
}

export async function getCurrentlyPlayingTrack(
    token: string
): Promise<GetCurrentlyPlayingResponse | undefined> {
    try {
        const track = await axios
            .get<GetCurrentlyPlayingResponse>(
                'https://api.spotify.com/v1/me/player/currently-playing',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                //console.log(res);
                return res.data;
            });
        return track;
    } catch (e) {
        console.log(e);
    }
}

async function postRefreshToken(oldToken: string, code: string) {
    const AUTH_URL = 'https://accounts.spotify.com/api/token';
    console.log(oldToken, code);
    const { data } = await axios.post<PostTokenResponse>(
        AUTH_URL,
        qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: oldToken,
            code,
            client_id: CLIENT_ID,
        }),

        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    console.log('Refresh token:', data);
    return data;
}



async function saveToken(token: SpotifyToken, code: string) {

}

//TODO: Refresh token
async function tryRefreshToken(refreshToken: string, code: string): Promise<SpotifyToken | undefined> {
    if (!refreshToken) return;
    const token = await postRefreshToken(refreshToken, code).then((res) => parseTokenResponse(res));
    console.log(token);
    return token;
}

export async function getSpotifyProps() {
    const fallbackResponse: GetCurrentlyPlayingResponse = {
        item: {
            artists: [{ name: 'Kendrick Lamar' }],
            external_urls: {
                spotify:
                    'https://open.spotify.com/track/5MMW4CZsZiZt2iuqAXzzWC',
            },
            name: 'The Heart Part 5',
        },
    };

    
    //TODO: Clean up logic
    const token = await getSpotifyToken();
    const expiryDate = new Date(token.expiryDate);
    //TODO: If no token found
    if (true) {
        await getSpotifyCode().then((code) => postRefreshToken(token.refreshToken, code));
    }
    if (!token) return { currentlyPlaying: fallbackResponse };
    const currentlyPlaying = await getCurrentlyPlayingTrack(token.token);
    console.log('Currently playing:', currentlyPlaying);
    if (!currentlyPlaying) return { currentlyPlaying: fallbackResponse };
    return { currentlyPlaying };
}
