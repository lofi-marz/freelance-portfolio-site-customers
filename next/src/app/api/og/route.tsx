/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        /*const interRegularData = await fetch(
            new URL('../../assets/Inter-Regular.ttf', import.meta.url)
        ).then((res) => res.arrayBuffer());*/
        const interBoldData = await fetch(
            new URL('../../../assets/Inter-Bold.ttf', import.meta.url)
        ).then((res) => res.arrayBuffer());

        const imageData = await fetch(
            new URL('./../../../assets/og-bg.png', import.meta.url)
        ).then((res) => res.arrayBuffer());
        //console.log('Url:', request.url);
        console.log('Request:', request);
        const { searchParams } = new URL(request.url);
        // ?title=<title>

        const title =
            searchParams.get('title') ??
            'Demystifying TypeScript: The Difference Between == and === Explained';
        const hasMark = title.endsWith('?') || title.endsWith('.');

        let categories = searchParams.getAll('categories') ?? ([] as string[]);
        console.log(categories);
        if (!Array.isArray(categories)) categories = [categories];
        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        height: '100%',
                        width: '100%',
                        fontSize: 20,
                        fontFamily: '"Inter Bold"',
                        paddingTop: '100px',
                        paddingLeft: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        padding: '5%',
                    }}>
                    <img
                        width="1200"
                        height="630"
                        tw="absolute inset-0"
                        alt=""
                        src={imageData as unknown as string}
                    />

                    <h1
                        tw="absolute top-12 left-12 w-3/5 text-7xl"
                        style={{ fontFamily: '"Inter Bold"' }}>
                        {title}
                    </h1>
                    <h2
                        tw="absolute bottom-12 left-12 text-4xl"
                        style={{ fontFamily: '"Inter Bold"' }}>
                        leondev
                        <span tw="text-emerald-500">.</span>
                        uk
                    </h2>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Inter Bold',
                        data: interBoldData,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response('Failed to generate the image', {
            status: 500,
        });
    }
}
