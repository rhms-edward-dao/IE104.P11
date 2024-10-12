from sqlalchemy.orm import Session
from database import engine
import models


# Crud Operation class for the same crud tasks
class crud_operations:
    def get_all(db, model_name):
        return db.query(model_name).all()

    def get_one_parameter(db, model_name, model_param, param):
        return db.query(model_name).filter(model_param == param).first()

    def add(db, new_db_item):
        try:
            db.add(new_db_item)
            db.commit()
            db.refresh(new_db_item)
            return new_db_item
        except:
            return None

    def delete(db, model_name, model_param, param):
        try:
            get_db = db.query(model_name).filter(model_param == param).first()
            db.delete(get_db)
            db.commit()
            return {"message": "Đã xóa"}
        except:
            return {"message": "Xóa thất bại"}


# MATHANG
# Get all MATHANG
def get_all_mathang(db: Session):
    return (
        db.query(
            models.Mathang, models.Loaimathang.tenloaimathang, models.Daily.tendaily
        )
        .filter(
            models.Mathang.madaily == models.Daily.madaily,
            models.Mathang.maloaimathang == models.Loaimathang.maloaimathang,
        )
        .all()
    )


# Get maloaimathang by tenloaimathang
def get_maloaimathang_by_tenloaimathang(db: Session, pTenLoaiMatHang: str):
    return (
        db.query(models.Loaimathang.maloaimathang)
        .filter(models.Loaimathang.tenloaimathang == pTenLoaiMatHang)
        .first()[0]
    )


# Get all tenloaimathang
def get_all_tenloaimathang(db: Session):
    return db.query(models.Loaimathang.tenloaimathang).all()


# Get mathang by id
def get_mathang_by_mamathang(db: Session, pMaMatHang: int):
    return (
        db.query(
            models.Mathang, models.Loaimathang.tenloaimathang, models.Daily.tendaily
        )
        .filter(
            models.Mathang.madaily == models.Daily.madaily,
            models.Mathang.maloaimathang == models.Loaimathang.maloaimathang,
            models.Mathang.mamathang == pMaMatHang,
        )
        .first()
    )


# Add New MATHANG
def add_new_mathang(**param_list):
    with engine.connect().execution_options(autocommit=True) as connection:
        connection.execute(
            """
            INSERT INTO MATHANG (
                tenmathang,
                soluongton,
                dongia,
                tendvt,
                hinhanh,
                madaily,
                maloaimathang
            )
            VALUES
            ( (%s), (%s), (%s), (%s), (%s), (%s), (%s))
        """,
            param_list["tenmathang"],
            param_list["soluongton"],
            param_list["dongia"],
            param_list["tendvt"],
            param_list["hinhanh"],
            param_list["madaily"],
            param_list["maloaimathang"],
        )


# Update MATHANG
def update_mathang(**param_list):
    if param_list["hinhanh"] != "":
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute(
                """
                UPDATE MATHANG                
                SET tenmathang = (%s),
                    soluongton = (%s),
                    dongia = (%s),
                    tendvt = (%s),
                    hinhanh = (%s),
                    madaily = (%s),
                    maloaimathang = (%s)
                WHERE mamathang = (%s)                                               
            """,
                param_list["tenmathang"],
                param_list["soluongton"],
                param_list["dongia"],
                param_list["tendvt"],
                param_list["hinhanh"],
                param_list["madaily"],
                param_list["maloaimathang"],
                param_list["mamathang"],
            )
    else:
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute(
                """
                UPDATE MATHANG                
                SET tenmathang = (%s),
                    soluongton = (%s),
                    dongia = (%s),
                    tendvt = (%s),
                    madaily = (%s),
                    maloaimathang = (%s)
                WHERE mamathang = (%s)                                               
            """,
                param_list["tenmathang"],
                param_list["soluongton"],
                param_list["dongia"],
                param_list["tendvt"],
                param_list["madaily"],
                param_list["maloaimathang"],
                param_list["mamathang"],
            )


# For Import and Export
