const bannerImage = process.env.NEXT_PUBLIC_URL + "/images/banner/email-banner.jpg";
const logoImage = process.env.NEXT_PUBLIC_URL + "/images/xstream-logo2.png";

export const verificationTemplate = (validationLink: string) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #111;
            color: #fff;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #1a1a1a;
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            text-align: center;
            padding: 20px;
            background-color: #ff0000;
            background-image: url('file:///Y:/download/Leonardo_Phoenix_10_A_highenergy_livestreaming_sales_session_f_5.jpg');
            background-size: cover;
            background-position: center;
            color: #fff;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
        }
        .email-header img {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body h1 {
            color: #ff0000;
        }
        .email-body p {
            line-height: 1.5;
            margin: 20px 0;
            color: white;
        }
        .email-body .btn {
            display: inline-block;
            margin: 20px auto;
            padding: 12px 20px;
            background-color: #ff0000;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
        }
        .email-footer {
            text-align: center;
            padding: 10px;
            background-color: #1a1a1a;
            font-size: 12px;
            color: #888;
        }
        .email-footer a {
            color: #ff0000;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="${bannerImage}" alt="Company Logo">
        </div>
        <div class="email-body">
            <h1>Verify Your Email</h1>
            <p>Thank you for signing up with us! Please click the button below to verify your email address and activate your account.</p>
            <a href="${validationLink}" class="btn">Verify Email</a>
        </div>
        <div class="email-footer">
            <p>If you didn't sign up, you can safely ignore this email.</p>
            <p>&copy; 2024 Xstream App. All rights reserved.</p>
            <p><a href="${process.env.NEXT_PUBLIC_URL}">Visit our website</a></p>
        </div>
    </div>
</body>
</html>
`;
};
