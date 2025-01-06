const nodemailer = require('nodemailer');
// const email = process.env.email;
// const password = process.env.password;

// Create a transporter using SMTP
let transporter = nodemailer.createTransport({
    service:'gmail',
    // host: 'smtp.ethereal.email',  
    port: 465,
    secure: true, //(true for port 465, false for port 587).
    auth: {
        user: 'amrendra.singh@bigship.in',  
        pass: 'eorakonjhrpfqlvy' 
    }
});

// Define the function to send email
const sendMail = async () => {
    try {
        // Send mail with the defined transport object
        let info = await transporter.sendMail({
            from: 'amrendra.singh@bigship.in', // Sender address
            to: 'ujjwal270797@gmail.com', // List of receivers
            subject: 'testing'+Math.random(0,1), // Subject line
            text: 'hello there', // Plain text body
            html: '' // HTML body
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Call the function to send a test email
// sendMail('amrendra.singh@bigship.in', 'singhnamrendra@gmail.com','Test Subject', 'Amrendra.', '<p>This hello wolrd.</p>');

// Export the function
module.exports = {sendMail};

