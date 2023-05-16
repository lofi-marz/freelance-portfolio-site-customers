import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import console from 'console';
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req);
    const { name = '', email = '', message = '' } = req.query;
    const msg = {
        to: 'othompsonedwards@gmail.com', // Change to your recipient
        from: 'othompsonedwards@gmail.com', // Change to your verified sender
        subject: 'Freelance Contact: ' + name,
        text: `${email} \n ${message}`,
        html: `${email} \n ${message}`,
    };

    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode);
            console.log(response[0].headers);
            res.status(200).json(req.body);
        })
        .catch((error) => {
            console.error(error);
        });
}
