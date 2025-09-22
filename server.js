const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('src'));

app.post('/send-chart-email', async (req, res) => {
    const { imageData, username, email } = req.body;
    // Remove the data URL prefix
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
    console.log('Received request to send email to:', { email, imageData });


    // Configure nodemailer (use a test SMTP service like Ethereal for development)
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'YOUR_ETHEREAL_USER',
    //         pass: 'YOUR_ETHEREAL_PASS'
    //     }
    // });

    // let mailOptions = {
    //     from: '"Bucks2Bar" <no-reply@bucks2bar.com>',
    //     to: email,
    //     subject: `${username}'s Chart`,
    //     text: 'Attached is your chart image.',
    //     attachments: [
    //         {
    //             filename: 'chart.png',
    //             content: base64Data,
    //             encoding: 'base64'
    //         }
    //     ]
    // };

    try {
        await transporter.sendMail(mailOptions);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send('Failed to send email');
    }
});

app.listen(3010, () => console.log('Server running on http://localhost:3010'));
