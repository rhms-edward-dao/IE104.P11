from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal
from fastapi import Form

# QUAN
class QUAN(BaseModel):
    maquan: int
    tenquan: str
    tenthanhpho: str

    class Config:
        orm_mode: True


class QuanCreate(BaseModel):
    tenquan: str
    tenthanhpho: str


class QuanUpdate(QuanCreate):
    pass


# LOAIDAILY
class LOAIDAILY(BaseModel):
    maloaidaily: int
    tenloaidaily: str
    sotiennotoida: Decimal

    class Config:
        orm_mode: True


# LOAIMATHANG
class LOAIMATHANG(BaseModel):
    maloaimathang: int
    tenloaimathang: str
    soluongton: int

    class Config:
        orm_mode: True


# MATHANG
class MATHANG(BaseModel):
    mamathang: int
    tenmathang: str
    dongiaban: Decimal
    tendvt: str
    madaily: int
    maloaimathang: int

    class Config:
        orm_mode: True


class MathangCreate(BaseModel):
    tenmathang: str
    dongiaban: Decimal
    tendvt: str
    madaily: int
    maloaimathang: int

    class Config:
        orm_mode: True


class MathangUpdate(MathangCreate):
    pass

# QUITAC
class QUITAC(BaseModel):
    maquitac: int
    tenquitac: str
    sodailytoidamoiquan: int
    tiledongiaban: Decimal
    sothietbitoidataikhoan: int
    thoidiemcapnhat: datetime

    class Config:
        orm_mode: True

class QUITACupdate(BaseModel):
    sodailytoidamoiquan: int
    tiledongiaban: Decimal
    sothietbitoidataikhoan: int

# LOAIDAILY
class LOAIDAILY(BaseModel):
    maloaidaily: int
    tenloaidaily: str
    sotiennotoida: Decimal

    class Config:
        orm_mode: True

# DAILY
class DAILY(BaseModel):
    madaily: int
    maloaidaily: int
    tendaily: str
    sodienthoai: str
    ngaytiepnhan: date
    sotienno: Decimal

    class Config:
        orm_mode: True

class DailyCreate(BaseModel):    
    tendaily: str
    tenloaidaily: str
    ngaytiepnhan: str
    sodienthoai: str
    tenquan: str
    tenthanhpho: str
    diachi: str

# NHANVIEN
class NHANVIEN(BaseModel):
    manhanvien: int
    madaily: int
    hoten: str
    ngaysinh: date
    sodienthoai: str
    email: str

    class Config:
        orm_mode: True

class NhanvienCreate(BaseModel):
    madaily: int
    hoten: str
    ngaysinh: date
    sodienthoai: str
    email: str

    class Config:
        orm_mode: True

class NhanvienUpdate(NhanvienCreate):
    pass

# CHUCVU
class CHUCVU(BaseModel):
    machucvu: int
    tenchucvu: str
    ngaytao: date
    luong: Decimal
    capdo: int
    thoihan: int

    class Config:
        orm_mode: True