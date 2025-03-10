const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://atharva-portfolio.netlify.app', 'https://localhost:5500', 'http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test email configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// Handle contact form submissions
app.post('/api/contact', async (req, res) => {
    console.log('Received contact form submission:', req.body);
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name, email, and message'
        });
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'atharva.shin00@gmail.com',
            subject: `New Contact Form Message from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `,
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
    <h2 style="color: #333; border-bottom: 2px solid #00ff88; padding-bottom: 10px;">New Contact Form Message</h2>
    <div style="background: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #00ff88; margin-top: 10px;">${message}</p>
    </div>
    <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">This message was sent from your portfolio contact form.</p>
</div>
            `
        });

        console.log('Email sent successfully');
        res.json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email. Please try again later.'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Email configuration:', {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS ? '(password set)' : '(no password set)'
    });
}); 