import axios from 'axios';
import crypto from 'crypto';
import qs from 'qs';

export type PostTokenResponse = {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
};

export type GetAuthorizeResponse = {
    code?: string;
    state: string;
    error?: string;
};

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
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    verifier = getCodeVerifier();
    state = getRandomChars(10);
    console.log('Generating:', verifier);
    const challenge = await generateCodeChallenge(verifier);
    const params = {
        client_id: id,
        response_type: 'code',
        redirect_uri: 'http://localhost:3005/spotify-login',
        state,
        code_challenge_method: 'S256',
        code_challenge: challenge,
        scope: 'user-read-private user-read-currently-playing',
    };
    return 'https://accounts.spotify.com/authorize?' + qs.stringify(params);
}

export async function getSpotifyTokenFromLogin(
    code: string,
    codeVerifier: string,
    receivedState: string
) {
    const AUTH_URL = 'https://accounts.spotify.com/api/token';
    //TODO: Now that I think about it this is bad since they can access the secret locally
    const id = process.env.SPOTIFY_CLIENT_ID;
    const secret = process.env.SPOTIFY_CLIENT_SECRET;
    if (receivedState != state) return;
    const { data } = await axios.post<PostTokenResponse>(
        AUTH_URL,
        qs.stringify({
            grant_type: 'authorization_code',
            code,
            client_id: id,
            code_verifier: codeVerifier,
            redirect_uri: 'http://localhost:3005/spotify-login',
        }),

        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' + new Buffer(id + ':' + secret).toString('base64'),
            },
        }
    );
    return data;
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
                console.log(res);
                return res.data;
            });
        return track;
    } catch (e) {
        console.log(e);
    }
}
