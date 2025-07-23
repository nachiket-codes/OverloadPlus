from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(os.getenv('SQL_URL'), connect_args={"check_same_thread": False})
sessionLocal = sessionmaker(bind = engine, autoflush=False, autocommit = False)
Base = declarative_base()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()
