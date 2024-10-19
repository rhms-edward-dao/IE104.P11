from pydantic import BaseModel
from datetime import date, datetime
from decimal import Decimal
from fastapi import Form


# TAIKHOAN
class TAIKHOAN(BaseModel):
    mataikhoan: int
    tentaikhoan: str
    matkhau: str

    class Congif:
        orm_mode: True


class TaikhoanCreate(BaseModel):
    tentaikhoan: str
    matkhau: str

    class Config:
        orm_mode: True


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
