const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pranjalvekariya812@gmail.com',  // replace with your email
        pass: 'pvhf yewc ppix ybna'    // replace with your email password
    }
});

app.post('/register', (req, res) => {
    const { name, email } = req.body;

    let mailOptions = {
        from: 'pranjalvekariya812@gmail.com',
        to: email,
        subject: 'Event Registration Confirmation',
        text: `Hello ${name},\n\nThank you for registering for our event!\n\nBest regards,\nEvent Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ success: true });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
