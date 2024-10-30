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


# Login, SignUp operations and TAIKHOAN manipulating
def get_taikhoan_by_tentaikhoan_and_matkhau(
    db: Session, pTenTaiKhoan: str, pMatKhau: str
):
    return (
        db.query(models.Taikhoan)
        .filter(
            models.Taikhoan.tentaikhoan == pTenTaiKhoan,
            models.Taikhoan.matkhau == pMatKhau,
        )
        .first()
    )


def get_manhanvien_taikhoan_nhanvien_capdo(db: Session, pMaTaiKhoan: int):
    try:
        get_manhanvien = (
            db.query(models.t_taikhoan_nhavien.c.manhanvien)
            .filter(models.t_taikhoan_nhavien.c.mataikhoan == pMaTaiKhoan)
            .first()[0]
        )

        get_tennhanvien = (
            db.query(models.Nhanvien.hoten)
            .filter(models.Nhanvien.manhanvien == get_manhanvien)
            .first()[0]
        )

        get_machucvu = (
            db.query(models.NhanvienChucvu.machucvu)
            .filter(models.NhanvienChucvu.manhanvien == get_manhanvien)
            .first()[0]
        )

        get_capdo = (
            db.query(models.Chucvu.capdo)
            .filter(models.Chucvu.machucvu == get_machucvu)
            .first()[0]
        )

        # 3 queries above need to be optimized
    except:
        return {"isStaff": False}

    return {
        "isStaff": True,
        "capdo": get_capdo,
        "manhanvien": get_manhanvien,
        "tennhanvien": get_tennhanvien,
    }


# QUAN
# Get all City in QUAN
def get_all_quan_thanhpho(db: Session):
    get_db = db.query(models.Quan.tenthanhpho).distinct().all()

    # Move data from [()] to []
    if get_db != []:
        data = [item[0] for item in get_db]
        return data
    return None


# Get all District in QUAN
def get_all_quan_quan(db: Session):
    get_db = db.query(models.Quan.tenquan).distinct().all()

    if get_db != []:
        data = [item[0] for item in get_db]
        return data
    return None


# Check duplicate Quan by district name and city name
def get_quan_by_tenquan_tenthanhpho(db: Session, pTenQuan: str, pTenThanhPho: str):
    return (
        db.query(models.Quan)
        .filter(
            models.Quan.tenquan == pTenQuan, models.Quan.tenthanhpho == pTenThanhPho
        )
        .first()
    )


def get_maquan_by_tenquan_tenthanhpho(db: Session, pTenQuan: str, pTenThanhPho: str):
    return (
        db.query(models.Quan.maquan)
        .filter(
            models.Quan.tenquan == pTenQuan, models.Quan.tenthanhpho == pTenThanhPho
        )
        .first()[0]
    )


def get_summary_quan() -> list:
    # get_db = db.query(models.Quan.tenquan, models.DailyDiachi.)
    with engine.connect().execution_options(autocommit=True) as connection:
        results = connection.execute(
            """
                                    select Quan.maquan, tenquan, tenthanhpho , count(Daily_diachi.maquan) as tong_so_daily
                                    from Quan, Daily_diachi
                                    where Quan.maquan = Daily_diachi.maquan
                                    group by Quan.maquan, tenquan, tenthanhpho;
                                    """
        )
        results_non_store = connection.execute(
            """
                                    select Quan.*, 0 as tong_so_daily
                                    from Quan;
                                    """
        )
        results_non_list = [row for row in results_non_store]
        results_list = [row for row in results]
        merged_results_list = results_non_list + results_list
        return merged_results_list


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

# QUITAC
def get_all_quitac(db: Session):
    return db.query(models.Quitac.sodailytoidamoiquan, models.Quitac.tiledongiaban, models.Quitac.sothietbitoidataikhoan).first()
def update_quitac(db: Session, pItems: schemas.QUITACupdate):
    try:
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute("""
                UPDATE QUITAC
                    SET
                    sothietbitoidataikhoan = (%s),
                    sodailytoidamoiquan = (%s),
                    tiledongiaban = (%s)
            """,        
            pItems.sothietbitoidataikhoan,
            pItems.sodailytoidamoiquan,
            pItems.tiledongiaban)
    except:
        return "cập nhật thất bại"
    return "Cập nhật thành công"

# LOAIDAILY
# Get all tenloaidaily in Loaidaily
def get_all_tenloaidaily():
    with engine.connect().execution_options(autocommit=True) as connection:
        results = connection.execute("""
                                        select distinct tenloaidaily
                                        from Loaidaily;
                                    """)
    results_list = [row for row in results]
    return results_list

# Get maloaidaily by tenloaidaily
def get_maloaidaily_by_tenloaidaily(db: Session, pTenLoaiDaiLy: str):
    return db.query(models.Loaidaily.maloaidaily) \
        .filter(models.Loaidaily.tenloaidaily == pTenLoaiDaiLy) \
        .first()[0]

# DAILY
# Get all in DAILY
def get_all_daily(db: Session):
    # Getting sotiennotoida field from LOAIDAILY and diachi field from DAILY_DIACHI
    try:
        get_db = db.query(models.Daily, models.Loaidaily.tenloaidaily, models.DailyDiachi.diachi, models.DailyDiachi.kinhdo, models.DailyDiachi.vido) \
            .filter(models.Loaidaily.maloaidaily == models.Daily.maloaidaily,
                models.DailyDiachi.madaily == models.Daily.madaily) \
            .all()
        return get_db    
    except:
        return None

# Get all tendaily
def get_all_tendaily(db: Session):
    return db.query(models.Daily.tendaily).distinct().all()

# Get madaily by tendaily
def get_madaily_by_tendaily(db: Session, pTenDaiLy: str):
    return db.query(models.Daily.madaily) \
        .filter(models.Daily.tendaily == pTenDaiLy) \
        .first()[0]

# Get Daily's hinhanh
def get_daily_hinhanh(db: Session):
    return db.query(models.Daily.hinhanh).all()

# Add DAILY
def get_daily_by_madaily(pMadaiLy: int):
    with engine.connect().execution_options(autocommit=True) as connection:
        results = connection.execute("""
                        SELECT tendaily, ngaytiepnhan, tenloaidaily, sodienthoai, tenquan, tenthanhpho, diachi, hinhanh
                        FROM Daily, Loaidaily, daily_diachi, Quan
                        WHERE Daily.maloaidaily = Loaidaily.maloaidaily
                        AND Daily.madaily = daily_diachi.madaily
                        AND daily_diachi.maquan = Quan.maquan
                        AND Daily.madaily = (%s);
                            """, pMadaiLy)
        results_list = [item for item in results]
        return results_list

def add_daily(**param_list):
    with engine.connect().execution_options(autocommit=True) as connection:
        connection.execute("""
            INSERT INTO Daily
            (tendaily, maloaidaily, ngaytiepnhan, sodienthoai, hinhanh) 
            VALUES
            ( (%s), (%s), (%s), (%s), (%s) );
        """, 
        param_list["tendaily"],
        param_list["maloaidaily"],
        param_list["ngaytiepnhan"],                        
        param_list["sodienthoai"],
        param_list["hinhanh"])

def update_daily(**param_list):
    print(param_list)
    if param_list["hinhanh"] == '':
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute("""
                UPDATE DAILY
                SET 
                    tendaily = (%s),
                    maloaidaily = (%s),
                    ngaytiepnhan = (%s),
                    sodienthoai = (%s)
                WHERE madaily = (%s);
            """, 
            param_list["tendaily"],
            param_list["maloaidaily"],
            param_list["ngaytiepnhan"],
            param_list["sodienthoai"],
            param_list["madaily"])
    else:
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute("""
                UPDATE DAILY
                SET 
                    tendaily = (%s),
                    maloaidaily = (%s),
                    ngaytiepnhan = (%s),
                    sodienthoai = (%s),
                    hinhanh = (%s)
                WHERE madaily = (%s);
            """, 
            param_list["tendaily"],
            param_list["maloaidaily"],
            param_list["ngaytiepnhan"],
            param_list["sodienthoai"],
            param_list["hinhanh"],
            param_list["madaily"])

def delete_daily_daily_diachi(**param_list):
    with engine.connect().execution_options(autocommit=True) as connection:
        connection.execute("""
            DELETE FROM (%s)
            WHERE (%s) = (%s);                           
        """, 
        param_list["param1"],
        param_list["param2"],
        param_list["param3"])

    # NHANVIEN
# Get all nhanvien
def get_all_nhanvien(db: Session):
    return db.query(models.Nhanvien, models.Chucvu.tenchucvu, models.NhanvienDiachi.diachi, models.Daily.tendaily, models.NhanvienDiachi.kinhdo, models.NhanvienDiachi.vido) \
        .filter(models.Nhanvien.manhanvien == models.NhanvienChucvu.manhanvien,
                models.NhanvienChucvu.machucvu == models.Chucvu.machucvu,
                models.Nhanvien.manhanvien == models.NhanvienDiachi.manhanvien,
                models.Nhanvien.madaily == models.Daily.madaily) \
        .all()
# Get manhanvien by email
def get_manhanvien_by_email(db: Session, pEmail: str):
    return db.query(models.Nhanvien.manhanvien) \
        .filter(models.Nhanvien.email == pEmail) \
        .first()

# Get nhanvien by manhanvien
def get_nhanvien_by_manhanvien(db: Session, pMaNhanVien: int):
    return db.query(models.Nhanvien, models.Quan.tenquan, models.Quan.tenthanhpho, models.Daily.tendaily, models.Chucvu.tenchucvu, models.NhanvienDiachi.diachi) \
        .filter(
            models.Nhanvien.manhanvien == models.NhanvienDiachi.manhanvien,
            models.NhanvienDiachi.maquan == models.Quan.maquan,
            models.Nhanvien.manhanvien == models.NhanvienChucvu.manhanvien,
            models.NhanvienChucvu.machucvu == models.Chucvu.machucvu,
            models.Nhanvien.madaily == models.Daily.madaily,
            models.Nhanvien.manhanvien == pMaNhanVien,
            models.Nhanvien.manhanvien == models.NhanvienDiachi.manhanvien
        ) \
        .first()

def get_nhanvien_chitiet_by_manhanvien(db: Session, pMaNhanVien: int):
    with engine.connect().execution_options(auto_commit=True) as connection:
        result = connection.execute("""
            SELECT
                nhanvien.hinhanh, hoten, ngaysinh, nhanvien.sodienthoai, email, diachi,
                tenchucvu, capdo, luong, ngaybatdau, thoihan,
                tendaily
            FROM nhanvien, chucvu, nhanvien_chucvu, nhanvien_diachi, daily
            WHERE nhanvien.manhanvien = nhanvien_chucvu.manhanvien
                and nhanvien_chucvu.machucvu = chucvu.machucvu
                and nhanvien.manhanvien = nhanvien_diachi.manhanvien
                and daily.madaily = nhanvien.madaily
                and nhanvien.manhanvien = (%s)
        """,
        pMaNhanVien)            
        return result.fetchone()
# Add new Staff
def add_nhanvien(**param_list):
    with engine.connect().execution_options(auto_commit=True) as connection:
        result = connection.execute("""
            INSERT INTO NHANVIEN (madaily, hoten, ngaysinh, sodienthoai, email, hinhanh)
            VALUES
            ( (%s), (%s), (%s), (%s), (%s), (%s))
            RETURNING manhanvien;
        """,
        param_list["madaily"],
        param_list["hoten"],
        param_list["ngaysinh"],
        param_list["sodienthoai"],
        param_list["email"],
        param_list["hinhanh"])        
        return result.fetchone()[0]
# Update Nhanvien
def update_nhanvien(manhanvien: int, **param_list):
    if param_list["hinhanh"] != '':        
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute("""
                    UPDATE NHANVIEN
                    SET
                        hoten = (%s),
                        madaily = (%s),
                        ngaysinh = (%s),
                        sodienthoai = (%s),
                        email = (%s),
                        hinhanh = (%s)
                    WHERE manhanvien = (%s);
            """,
            param_list["hoten"],
            param_list["madaily"],
            param_list["ngaysinh"],
            param_list["sodienthoai"],
            param_list["email"],
            param_list["hinhanh"],
            manhanvien)
    else:
        with engine.connect().execution_options(autocommit=True) as connection:
            connection.execute("""
                    UPDATE NHANVIEN
                    SET
                        hoten = (%s),
                        madaily = (%s),
                        ngaysinh = (%s),
                        sodienthoai = (%s),
                        email = (%s)
                    WHERE manhanvien = (%s);
            """,
            param_list["hoten"],
            param_list["madaily"],
            param_list["ngaysinh"],
            param_list["sodienthoai"],
            param_list["email"],
            manhanvien)

# CHUCVU
# Get all tenchucvu
def get_all_tenchucvu(db: Session):
    return db.query(models.Chucvu.tenchucvu).distinct().all()
# Get machucvu by tenchucvu
def get_machucvu_by_tenchucvu(db: Session, pTenChucVu: str):
    return db.query(models.Chucvu.machucvu) \
        .filter(models.Chucvu.tenchucvu == pTenChucVu) \
        .first()[0]
# Update CHUCVU
def update_chucvu(machucvu: int, **param_list):
    with engine.connect().execution_options(autocommit=True) as connection:
        connection.execute("""
            UPDATE CHUCVU
                           SET
                           tenchucvu = (%s),
                           capdo = (%s),
                           luong = (%s),
                           thoihan = (%s),
                           ngaycapnhat = (%s)
            WHERE machucvu = (%s);
        """,
        param_list["tenchucvu"],
        param_list["capdo"],
        param_list["luong"],
        param_list["thoihan"],
        param_list["ngaycapnhat"],
        machucvu)
# For Import and Export
