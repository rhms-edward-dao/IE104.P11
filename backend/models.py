# coding: utf-8
from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    SmallInteger,
    String,
    Table,
    Text,
    text,
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Khachhang(Base):
    __tablename__ = "khachhang"

    makhachhang = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('khachhang_makhachhang_seq'::regclass)"),
    )
    tenkhachhang = Column(String(100), nullable=False)
    sodienthoai = Column(String(20), nullable=False, unique=True)

    mathang = relationship("Mathang", secondary="yeuthich")
    taikhoan = relationship("Taikhoan", secondary="taikhoan_khachhang")


class Loaimathang(Base):
    __tablename__ = "loaimathang"

    maloaimathang = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('loaimathang_maloaimathang_seq'::regclass)"),
    )
    tenloaimathang = Column(String(100), nullable=False, unique=True)
    soluongton = Column(Integer, server_default=text("0"))


class Quan(Base):
    __tablename__ = "quan"

    maquan = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('quan_maquan_seq'::regclass)"),
    )
    tenquan = Column(String(100), nullable=False, index=True)
    tenthanhpho = Column(String(100), nullable=False)


class Taikhoan(Base):
    __tablename__ = "taikhoan"
    __table_args__ = (
        Index("idx_tentaikhoan_isactivated", "tentaikhoan", "isactivated"),
    )

    mataikhoan = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('taikhoan_mataikhoan_seq'::regclass)"),
    )
    tentaikhoan = Column(String(100), nullable=False, unique=True)
    matkhau = Column(String(200), nullable=False)
    isactivated = Column(Boolean, server_default=text("false"))


class KhachhangDiachi(Base):
    __tablename__ = "khachhang_diachi"

    makhachhang = Column(
        ForeignKey("khachhang.makhachhang", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    maquan = Column(ForeignKey("quan.maquan"), primary_key=True, nullable=False)
    diachi = Column(String(200), nullable=False)

    khachhang = relationship("Khachhang")
    quan = relationship("Quan")


class DailyDiachi(Base):
    __tablename__ = "daily_diachi"

    madaily = Column(
        ForeignKey("daily.madaily", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    maquan = Column(
        ForeignKey("quan.maquan", ondelete="CASCADE"), primary_key=True, nullable=False
    )
    diachi = Column(String(200), nullable=False, unique=True)
    kinhdo = Column(String(15), nullable=False)
    vido = Column(String(15), nullable=False)

    daily = relationship("Daily")
    quan = relationship("Quan")


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


class Nhanvien(Base):
    __tablename__ = "nhanvien"

    manhanvien = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('nhanvien_manhanvien_seq'::regclass)"),
    )
    madaily = Column(ForeignKey("daily.madaily", ondelete="SET NULL"), nullable=False)
    hoten = Column(String(100), nullable=False)
    ngaysinh = Column(Date, nullable=False)
    sodienthoai = Column(String(20), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    hinhanh = Column(String(200))

    daily = relationship("Daily")
    taikhoan = relationship("Taikhoan", secondary="taikhoan_nhanvien")


TaikhoanNhanvien = Table(
    "taikhoan_nhanvien",
    metadata,
    Column(
        "manhanvien",
        ForeignKey("nhanvien.manhanvien", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    ),
    Column(
        "mataikhoan",
        ForeignKey("taikhoan.mataikhoan", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    ),
)
