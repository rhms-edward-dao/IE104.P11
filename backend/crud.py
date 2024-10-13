from sqlalchemy.orm import Session
from database import engine
import models, schemas
import datetime

# Crud Operation class for the same crud tasks
class crud_operations():
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
            return {
                "message": "Đã xóa"
            }
        except:
            return {
                "message": "Xóa thất bại"
            }

# Login, SignUp operations and TAIKHOAN manipulating
def get_taikhoan_by_tentaikhoan_and_matkhau(db: Session, pTenTaiKhoan: str, pMatKhau: str):
    return db.query(models.Taikhoan) \
        .filter(models.Taikhoan.tentaikhoan == pTenTaiKhoan, models.Taikhoan.matkhau == pMatKhau) \
        .first()

def get_manhanvien_taikhoan_nhanvien_capdo(db: Session, pMaTaiKhoan: int):
    try:
        get_manhanvien = db.query(models.TaikhoanNhanvien.c.manhanvien) \
            .filter(models.TaikhoanNhanvien.c.mataikhoan == pMaTaiKhoan) \
            .first()[0]

        get_tennhanvien = db.query(models.Nhanvien.hoten) \
            .filter(models.Nhanvien.manhanvien == get_manhanvien) \
            .first()[0]

        get_machucvu = db.query(models.NhanvienChucvu.machucvu) \
            .filter(models.NhanvienChucvu.manhanvien == get_manhanvien) \
            .first()[0]
        
        get_capdo = db.query(models.Chucvu.capdo) \
            .filter(models.Chucvu.machucvu == get_machucvu) \
            .first()[0]
        
        # 3 queries above need to be optimized
    except: 
        return {
            "isStaff": False
        }
    
    return {
        "isStaff": True,
        "capdo":  get_capdo,
        "manhanvien": get_manhanvien,
        "tennhanvien": get_tennhanvien,
    }

# QUAN
# Get all City in QUAN
def get_all_quan_thanhpho(db: Session):
    get_db = db.query(models.Quan.tenthanhpho) \
        .distinct() \
        .all()
    
    # Move data from [()] to []
    if get_db != []:
        data = [item[0] for item in get_db]    
        return data
    return None

# Get all District in QUAN
def get_all_quan_quan(db: Session):
    get_db = db.query(models.Quan.tenquan) \
        .distinct() \
        .all()
    
    if get_db != []:
        data = [item[0] for item in get_db]
        return data
    return None

# Check duplicate Quan by district name and city name
def get_quan_by_tenquan_tenthanhpho(db: Session, pTenQuan: str, pTenThanhPho: str):
    return db.query(models.Quan) \
        .filter(models.Quan.tenquan == pTenQuan, models.Quan.tenthanhpho == pTenThanhPho) \
        .first()

def get_maquan_by_tenquan_tenthanhpho(db: Session, pTenQuan: str, pTenThanhPho: str):
    return db.query(models.Quan.maquan) \
        .filter(models.Quan.tenquan == pTenQuan, models.Quan.tenthanhpho == pTenThanhPho) \
        .first()[0]

def get_summary_quan() -> list:
    # get_db = db.query(models.Quan.tenquan, models.DailyDiachi.)
    with engine.connect().execution_options(autocommit=True) as connection:
        results = connection.execute("""
                                    select Quan.maquan, tenquan, tenthanhpho , count(Daily_diachi.maquan) as tong_so_daily
                                    from Quan, Daily_diachi
                                    where Quan.maquan = Daily_diachi.maquan
                                    group by Quan.maquan, tenquan, tenthanhpho;
                                    """)
        results_non_store = connection.execute("""
                                    select Quan.*, 0 as tong_so_daily
                                    from Quan;
                                    """)
        results_non_list = [row for row in results_non_store]                                   
        results_list = [row for row in results]
        merged_results_list = results_non_list + results_list
        return merged_results_list

# MATHANG 
# Get all MATHANG
def get_all_mathang(db: Session):
    return db.query(models.Mathang, models.Loaimathang.tenloaimathang, models.Daily.tendaily) \
        .filter(models.Mathang.madaily == models.Daily.madaily, models.Mathang.maloaimathang == models.Loaimathang.maloaimathang) \
        .all()
# Get maloaimathang by tenloaimathang
def get_maloaimathang_by_tenloaimathang(db: Session, pTenLoaiMatHang: str):
    return db.query(models.Loaimathang.maloaimathang) \
        .filter(models.Loaimathang.tenloaimathang == pTenLoaiMatHang) \
        .first()[0]
# Get all tenloaimathang
def get_all_tenloaimathang(db: Session):
    return db.query(models.Loaimathang.tenloaimathang).all()
# Get mathang by id
def get_mathang_by_mamathang(db: Session, pMaMatHang: int):
    return db.query(models.Mathang, models.Loaimathang.tenloaimathang, models.Daily.tendaily) \
        .filter(
            models.Mathang.madaily == models.Daily.madaily,
            models.Mathang.maloaimathang == models.Loaimathang.maloaimathang,
            models.Mathang.mamathang == pMaMatHang
        ) \
        .first()
# Add New MATHANG
def add_new_mathang(**param_list):
    with engine.connect().execution_options(autocommit=True) as connection:
        connection.execute("""
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
        param_list["maloaimathang"])
# Update MATHANG
def update_mathang(**param_list):
    if param_list["hinhanh"] != '':
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute("""
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
            param_list["mamathang"])
    else:
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute("""
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
            param_list["mamathang"])
# QUITAC

# For Import and Export
