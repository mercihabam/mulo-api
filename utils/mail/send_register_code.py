from django.core.mail import send_mail

from core.settings import DEFAULT_FROM_EMAIL


def send_register_code_mail(user_data, code):
    subject = f'Veillez valider votre compte'
    html_msg = f"""
    <div style="width: 80%; margin: 0 auto; font-family: sans-serif;">
        <nav style="background-color: #c4c4c4;">
            <h1 style="text-align: left;">MULO vous demande de vérifier votre adresse e-mail</h1>
        </nav>
        <div style="margin-top: 2rem;">
            <h2>Bonjour {user_data['first_name']} {user_data['last_name']}!</h2> <p>Vous vous êtes récemment inscrit 
            sur MULO, nous vous avons envoyé cet email afin de vérifier si l'email que vous nous avez fourni est 
            viable, pour des raisons de sécurité et pour améliorer les services que vous recevez de MULO !</p> 
            <p>Veuillez copier le code ci-dessous, afin que nous sachions que cet e-mail vous appartient et valider 
            votre compte. Gardez à l'esprit que vous devez toujours vous souvenir de l'e-mail et du mot de passe que 
            vous avez utilisés et ne les partagez avec personne d'autre !</p> <div style="padding: 1rem 0 1rem 0;"> 
            <h2 style="background-color: rgb(6, 143, 6); text-align: center; color: #ffffff; padding: 0.8rem; 
            border-radius: 0.2rem;"> {code} 
            </h2>
            </div>
            <p>Si vous ne vous êtes pas enregistré sur MULO récemment,
            nous sommes désolés pour ce désagrément, ignorez cet email !</p>
            <div>
            <p>Cordialement,</p>
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
        recipient_list=[user_data['email']],
        message="Verification code"
    )
