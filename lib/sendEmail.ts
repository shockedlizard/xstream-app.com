import nodemailer from 'nodemailer';
export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER,
            port: Number(process.env.EMAIL_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        // Send email
        const info = await transporter.sendMail({
            from: '"Xstream" <noreply@xstream-app.com>',
            to: to,
            subject: subject,
            html: html
        });
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
