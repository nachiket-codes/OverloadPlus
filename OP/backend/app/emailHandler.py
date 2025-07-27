import smtplib

from email.message import EmailMessage
from dotenv import load_dotenv
import os

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
FRONTEND_BASE_URL = os.getenv("FRONTEND_BASE_URL")

def sendResetPwdLink(toEmail: str, token: str):
    try:
        print(EMAIL_ADDRESS)
        print(EMAIL_PASSWORD)
        resetLink = fr"{FRONTEND_BASE_URL}/password-reset?token={token}"
        msg = EmailMessage()
        msg['Subject'] = "Reset Your Password"
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = toEmail

        # Plain text fallback
        msg.set_content(f"Click the link to reset your password: {resetLink}")

        # HTML version with button
        html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Password Reset Request</h2>
            <p>You requested to reset your password. Click the button below to proceed:</p>
            <a href="{resetLink}" style="
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                font-size: 16px;
                border-radius: 5px;
            ">Reset Password</a>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>Thanks,<br>Your App Team</p>
        </body>
        </html>
        """
        msg.add_alternative(html, subtype='html')

        # Send the email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            print("Login successfull")
            smtp.send_message(msg)
        return True
    except Exception as ex:
        print(f"Exception occurred while sending reset password link to user : {ex}")
        return False