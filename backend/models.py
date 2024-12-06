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
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Chucvu(Base):
    __tablename__ = "chucvu"
    __table_args__ = (
        CheckConstraint("luong >= (3000000)::numeric"),
        CheckConstraint("ngaycapnhat >= ngaytao"),
    )

    machucvu = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('chucvu_machucvu_seq'::regclass)"),
    )
    tenchucvu = Column(String(100), nullable=False, unique=True)
    ngaytao = Column(Date, server_default=text("CURRENT_DATE"))
    ngaycapnhat = Column(Date, server_default=text("CURRENT_DATE"))
    capdo = Column(SmallInteger, index=True, server_default=text("0"))
    luong = Column(Numeric(12, 4), index=True, server_default=text("3000000"))


class Khachhang(Base):
    __tablename__ = "khachhang"

    makhachhang = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('khachhang_makhachhang_seq'::regclass)"),
    )
    tenkhachhang = Column(String(100), nullable=False)
    sodienthoai = Column(String(20), nullable=False, unique=True)


class Loaidaily(Base):
    __tablename__ = "loaidaily"

    maloaidaily = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('loaidaily_maloaidaily_seq'::regclass)"),
    )
    tenloaidaily = Column(String(100), nullable=False, unique=True)
    sotiennotoida = Column(Numeric(12, 4), server_default=text("0"))


class Loaimathang(Base):
    __tablename__ = "loaimathang"

    maloaimathang = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('loaimathang_maloaimathang_seq'::regclass)"),
    )
    tenloaimathang = Column(String(100), nullable=False, unique=True)


class Quan(Base):
    __tablename__ = "quan"

    maquan = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('quan_maquan_seq'::regclass)"),
    )
    tenquan = Column(String(100), nullable=False, index=True)
    tenthanhpho = Column(String(100), nullable=False)


t_quitac = Table(
    "quitac",
    metadata,
    Column("sodailytoidamoiquan", SmallInteger, server_default=text("0")),
    Column("tiledongiaban", Numeric(5, 5), server_default=text("0")),
    Column("sothietbitoidataikhoan", SmallInteger, server_default=text("0")),
    Column("thoidiemcapnhat", DateTime, server_default=text("CURRENT_TIMESTAMP")),
    CheckConstraint("sodailytoidamoiquan >= 0"),
    CheckConstraint("sothietbitoidataikhoan >= 0"),
    CheckConstraint("tiledongiaban >= (0)::numeric"),
)


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
    OTP = Column(String(4), nullable=True)
    otp_expiration = Column(DateTime, nullable=True)


class Daily(Base):
    __tablename__ = "daily"

    madaily = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('daily_madaily_seq'::regclass)"),
    )
    maloaidaily = Column(
        ForeignKey("loaidaily.maloaidaily", ondelete="SET NULL"), nullable=False
    )
    tendaily = Column(String(100), nullable=False, unique=True)
    sodienthoai = Column(String(20), nullable=False, unique=True)
    ngaytiepnhan = Column(Date, server_default=text("CURRENT_DATE"))
    sotienno = Column(Numeric(12, 4), server_default=text("0"))
    hinhanh = Column(String(200))

    loaidaily = relationship("Loaidaily")


class KhachhangDiachi(Base):
    __tablename__ = "khachhang_diachi"

    makhachhang = Column(
        ForeignKey("khachhang.makhachhang", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    maquan = Column(ForeignKey("quan.maquan"), primary_key=True, nullable=False)
    diachi = Column(String(200), nullable=False)
    kinhdo = Column(String(15), nullable=False)
    vido = Column(String(15), nullable=False)
    khachhang = relationship("Khachhang")
    quan = relationship("Quan")


class Baocaocongno(Base):
    __tablename__ = "baocaocongno"
    __table_args__ = (
        CheckConstraint("(1 <= thang) AND (thang <= 12)"),
        CheckConstraint(
            "date_part('day'::text, ngaylapbaocao) < (29)::double precision"
        ),
        Index("idx_baocaocongno_madaily_ngaylapbaocao", "madaily", "ngaylapbaocao"),
    )

    thang = Column(SmallInteger, primary_key=True, nullable=False)
    madaily = Column(
        ForeignKey("daily.madaily", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    nodau = Column(Numeric(12, 4), nullable=False)
    phatsinh = Column(Numeric(12, 4), server_default=text("0"))
    ngaylapbaocao = Column(Date, index=True, server_default=text("CURRENT_DATE"))

    daily = relationship("Daily")


class Baocaodoanhso(Base):
    __tablename__ = "baocaodoanhso"
    __table_args__ = (
        CheckConstraint("(1 <= thang) AND (thang <= 12)"),
        CheckConstraint(
            "date_part('day'::text, ngaylapbaocao) < (29)::double precision"
        ),
        Index("idx_baocaodoanhso_madaily_ngaylapbaocao", "madaily", "ngaylapbaocao"),
    )

    thang = Column(SmallInteger, primary_key=True, nullable=False)
    madaily = Column(
        ForeignKey("daily.madaily", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    sophieuxuat = Column(SmallInteger, server_default=text("0"))
    tonggiatrixuat = Column(Numeric(12, 4), server_default=text("0"))
    sophieunhap = Column(SmallInteger, server_default=text("0"))
    tonggiatrinhap = Column(Numeric(12, 4), server_default=text("0"))
    chiphibaotri = Column(Numeric(12, 4), server_default=text("0"))
    ngaylapbaocao = Column(Date, index=True, server_default=text("CURRENT_DATE"))

    daily = relationship("Daily")


class Baotridaily(Base):
    __tablename__ = "baotridaily"
    __table_args__ = (
        CheckConstraint("thoidiemketthuc >= thoidiembatdau"),
        Index("idx_madaily_thoidiembatdau", "madaily", "thoidiembatdau"),
    )

    mabaotri = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('baotridaily_mabaotri_seq'::regclass)"),
    )
    madaily = Column(ForeignKey("daily.madaily", ondelete="CASCADE"), nullable=False)
    thoidiembatdau = Column(
        DateTime, index=True, server_default=text("CURRENT_TIMESTAMP")
    )
    thoidiemketthuc = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
    mota = Column(Text)
    chiphidukien = Column(Numeric(12, 4), server_default=text("0"))
    chiphibaotri = Column(Numeric(12, 4), nullable=False)

    daily = relationship("Daily")


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
    soluongton = Column(Integer, server_default=text("0"))
    dongia = Column(Numeric(12, 4), nullable=False)
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
    ngaysinh = Column(Date, server_default=text("CURRENT_DATE"))
    sodienthoai = Column(String(20), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    hinhanh = Column(String(200), server_default=text("NULL::character varying"))

    daily = relationship("Daily")
    taikhoan = relationship("Taikhoan", secondary="taikhoan_nhavien")


class Phieunhaphang(Base):
    __tablename__ = "phieunhaphang"
    __table_args__ = (Index("idx_pnh_madaily_ngaylapphieu", "madaily", "ngaylapphieu"),)

    maphieunhap = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('phieunhaphang_maphieunhap_seq'::regclass)"),
    )
    madaily = Column(
        ForeignKey("daily.madaily", ondelete="CASCADE"), nullable=False, index=True
    )
    ngaylapphieu = Column(Date, index=True, server_default=text("CURRENT_DATE"))
    tongtien = Column(Numeric(12, 4), nullable=False)
    tiendathanhtoan = Column(Numeric(12, 4), server_default=text("0"))
    tinhtrang = Column(String(50), server_default=text("'Còn nợ'::character varying"))

    daily = relationship("Daily")


class Phieuxuathang(Base):
    __tablename__ = "phieuxuathang"
    __table_args__ = (Index("idx_pxh_madaily_ngaylapphieu", "madaily", "ngaylapphieu"),)

    maphieuxuat = Column(
        SmallInteger,
        primary_key=True,
        server_default=text("nextval('phieuxuathang_maphieuxuat_seq'::regclass)"),
    )
    ngaylapphieu = Column(Date, index=True, server_default=text("CURRENT_DATE"))
    tongtien = Column(Numeric(12, 4), nullable=False)
    madaily = Column(
        ForeignKey("daily.madaily", ondelete="CASCADE"), nullable=False, index=True
    )
    makhachhang = Column(
        ForeignKey("khachhang.makhachhang", ondelete="CASCADE"), nullable=False
    )

    daily = relationship("Daily")
    khachhang = relationship("Khachhang")


class ChitietPnh(Base):
    __tablename__ = "chitiet_pnh"

    mact_pnh = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('chitiet_pnh_mact_pnh_seq'::regclass)"),
    )
    maphieunhap = Column(
        ForeignKey("phieunhaphang.maphieunhap", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    mamathang = Column(
        ForeignKey("mathang.mamathang", ondelete="SET NULL"), nullable=False, index=True
    )
    soluongnhap = Column(Integer, server_default=text("0"))
    dongianhap = Column(Numeric(12, 4), nullable=False)

    mathang = relationship("Mathang")
    phieunhaphang = relationship("Phieunhaphang")


class ChitietPxh(Base):
    __tablename__ = "chitiet_pxh"

    mact_pxh = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('chitiet_pxh_mact_pxh_seq'::regclass)"),
    )
    maphieuxuat = Column(
        ForeignKey("phieuxuathang.maphieuxuat", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    mamathang = Column(
        ForeignKey("mathang.mamathang", ondelete="SET NULL"), nullable=False, index=True
    )
    soluongxuat = Column(Integer, server_default=text("0"))

    mathang = relationship("Mathang")
    phieuxuathang = relationship("Phieuxuathang")


class NhanvienChucvu(Base):
    __tablename__ = "nhanvien_chucvu"
    __table_args__ = (CheckConstraint("thoihan >= (0)::numeric"),)

    manhanvien = Column(
        ForeignKey("nhanvien.manhanvien", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    machucvu = Column(ForeignKey("chucvu.machucvu"), primary_key=True, nullable=False)
    ngaybatdau = Column(
        Date, primary_key=True, nullable=False, server_default=text("CURRENT_DATE")
    )
    thoihan = Column(Numeric(12, 4), server_default=text("1"))

    chucvu = relationship("Chucvu")
    nhanvien = relationship("Nhanvien")


class NhanvienDiachi(Base):
    __tablename__ = "nhanvien_diachi"

    manhanvien = Column(
        ForeignKey("nhanvien.manhanvien", ondelete="CASCADE"),
        primary_key=True,
        nullable=False,
    )
    maquan = Column(ForeignKey("quan.maquan"), primary_key=True, nullable=False)
    diachi = Column(String(200), nullable=False)
    kinhdo = Column(String(15), nullable=False)
    vido = Column(String(15), nullable=False)

    nhanvien = relationship("Nhanvien")
    quan = relationship("Quan")


t_taikhoan_nhavien = Table(
    "taikhoan_nhavien",
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
