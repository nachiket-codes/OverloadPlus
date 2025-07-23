from fastapi.security import OAuth2PasswordBearer
from authentication import verifyAccessToken
from fastapi import Depends

from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
import os
from dotenv import load_dotenv

oauthScheme = OAuth2PasswordBearer(tokenUrl = '/auth/login')

def get_user(token: str = Depends(oauthScheme)):
    return verifyAccessToken(token = token)

# GOOGLE AUTH
load_dotenv()

config_data = {
    "GOOGLE_CLIENT_ID": os.getenv("GOOGLE_CLIENT_ID"),
    "GOOGLE_CLIENT_SECRET": os.getenv("GOOGLE_CLIENT_SECRET"),
}

config = Config(environ=config_data)

oauthG = OAuth(config)

oauthG.register(
    name='google',
    client_id=config_data["GOOGLE_CLIENT_ID"],
    client_secret=config_data["GOOGLE_CLIENT_SECRET"],
    access_token_url='https://oauth2.googleapis.com/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v2/',
    userinfo_endpoint='https://www.googleapis.com/oauth2/v2/userinfo',
    client_kwargs={'scope': 'openid email profile'},
)