import datetime
import os

from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from jose import jwt

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(user_id: int) -> str:
    try:
        print(f"Generating token for user_id: {user_id}")
        payload = {
            "sub": str(user_id),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2),
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        if isinstance(token, bytes):
            token = token.decode("utf-8")

        return token
    except Exception as e:
        print(f"Error during token creation: {e}")
        raise
