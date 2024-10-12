# coding: utf-8
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    Numeric,
    SmallInteger,
    String,
    text,
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Loaimathang(Base):
    __tablename__ = "loaimathang"

    maloaimathang = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('loaimathang_maloaimathang_seq'::regclass)"),
    )
    tenloaimathang = Column(String(100), nullable=False, unique=True)
    soluongton = Column(Integer, server_default=text("0"))


class Mathang(Base):
    __tablename__ = "mathang"

    mamathang = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('mathang_mamathang_seq'::regclass)"),
    )
    tenmathang = Column(String(100), nullable=False, unique=True)
    dongiaban = Column(Numeric(12, 4), nullable=False)
    tendvt = Column(String(50), nullable=False)
    hinhanh = Column(String(200))
    madaily = Column(ForeignKey("daily.madaily", ondelete="CASCADE"), nullable=False)
    maloaimathang = Column(
        ForeignKey("loaimathang.maloaimathang", ondelete="CASCADE"), nullable=False
    )

    daily = relationship("Daily")
    loaimathang = relationship("Loaimathang")
