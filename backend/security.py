# import jwt
# from fastapi import Depends, HTTPException
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from pydantic import ValidationError
# from passlib.context import CryptContext
# from datetime import datetime, timedelta

# SECRET_KEY = '09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7'
# SECURITY_ALGORITHM = 'HS256'
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# from fastapi.security import OAuth2PasswordBearer
# reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="token")

# def generate_token(tentaikhoan: str) -> str: 
#     expire = datetime.utcnow() + timedelta(
#         seconds = 60 * 30
#     )
#     to_encode = {
#         "exp": expire,
#         "tentaikhoan": tentaikhoan
#     }
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=SECURITY_ALGORITHM)
#     return encoded_jwt

# def validate_token(token: Annotated[str, Depends(reusable_oauth2)]) -> str:
#     try:
#         payload = jwt.decode(http_authorization_credentials.credentials, SECRET_KEY, algorithms=[SECURITY_ALGORITHM])
#         # Check expired here
#         return payload
    
#     except(jwt.PyJWTError, ValidationError):
#         raise HTTPException(
#             status_code=403,
#             detail=f"Could not validate credentials",
#         )