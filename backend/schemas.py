from pydantic import BaseModel
from decimal import Decimal


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
