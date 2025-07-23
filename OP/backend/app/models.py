from database import Base
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from sqlalchemy.dialects.mssql import UNIQUEIDENTIFIER
import uuid

class User(Base):
    __tablename__ = "user"

    # id = Column(UNIQUEIDENTIFIER, primary_key=True, default=uuid.uuid4, nullable=False)
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False)
    username = Column(String(50), unique = True, nullable = False)
    email = Column(String(50), unique = True, nullable = False)
    password =  Column(String(255), nullable = True)
    provider = Column(String, default="local")
    createdAt = Column(DateTime, default = datetime.utcnow)