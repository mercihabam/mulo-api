from django.core.mail import send_mail

from core.settings import DEFAULT_FROM_EMAIL


def send_register_code_mail(user_data, code):
    subject = f'Verify your email address'
    html_msg = f"""MULO needs you to verify your email address {code}  this is your validation code
    <div style="width: 70%; margin: 0 auto; font-family: sans-serif;">
        <nav style="background-color: #c4c4c4; padding: 0.1rem;">
            <h1 style="text-align: center;">MULO needs you to verify your email address</h1>
        </nav>
        <div style="padding: 2rem;">
            <h2>Hi {user_data['first_name']} {user_data['last_name']}!</h2>
        <p>You recently registered on MULO, we sent you this email in order to verify if the email you provided us is viable,
            for the sake of security and better services you receive from MULO!</p>
        <p>Kindly copy the code below, so that we will know that this email belongs to you. Keep in mind that you need to always remember your email
            and password you used and don’t share it with anyone else!</p>
            <div style="padding: 1rem 0 1rem 0;">
            <p style="background-color: #861A02; color: #ffffff; width: 40%; padding: 0.8rem; text-decoration: none; border-radius: 0.2rem;">
                {code}This your validation code
            </p>
            </div>
            <p>If you didn’t register on MULO system recently,
            we are sorry for that inconvenience, ignore this email!</p>
            <div>
            <p>Yours truly,</p>
            <p>MULO</p>
            </div>
        </div>
        <footer style="background-color: #c4c4c4; padding: 0.1rem">
            <p style="text-align: center; font-size: 0.8rem;">© 2022 <a href="#">MULO</a>. All rights reserved.</p>
        </footer>
    </div>
    """
    return send_mail(
        subject=subject, from_email=DEFAULT_FROM_EMAIL,
        html_message=html_msg,
        recipient_list=user_data.email,
        message="Verification code"
    )
