from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = (
    "postgresql://postgres:027735@localhost:5432/ERP_WebApp"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
