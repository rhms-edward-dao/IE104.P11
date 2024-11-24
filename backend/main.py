from fastapi import FastAPI, Depends, HTTPException, Body, UploadFile, File, Form
from typing import Union
from sqlalchemy.orm import Session
import models, schemas, crud
from database import Session, engine

# import jwt
from datetime import datetime, timedelta
from decimal import Decimal
from fastapi.middleware.cors import CORSMiddleware

from opencage.geocoder import OpenCageGeocode
from pprint import pprint
import re, os, base64

# IMAGEDIR = r"D:/Studying/UIT Online Class/IE104.P11 - Internet Va Cong Nghe Web/Bao Cao/GitHub/backend/images"
IMAGEDIR = r"/home/kui/Documents/UIT/HK_I_24_25/IE104/Final Project/Github/IE104.P11/backend/images/"

# from security import validate_token
app = FastAPI()

# add cors - middleware
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()


class api_operations:
    def get_all(db, model_name, name_in_mes):
        get_db = crud.crud_operations.get_all(db, model_name)
        if get_db:
            return get_db

        return {"message": "Danh sách {} rỗng".format(name_in_mes)}

    def get_one_parameter(db, model_name, model_param, param, name_in_mes):
        get_db = crud.crud_operations.get_one_parameter(
            db, model_name, model_param, param
        )
        if get_db:
            return get_db

        return {"message": "Không tìm thấy {}".format(name_in_mes)}

    def add(db, model_name, name_in_mes, **param_list):
        # if any unique attribute will become duplicate, an message will be returned from database
        new_db_item = model_name(**param_list)
        add_db = crud.crud_operations.add(db, new_db_item)
        message_fail = "Thêm {} thất bại do {} đã tồn tại".format(
            name_in_mes, name_in_mes
        )
        if add_db:
            return {"message": "Thêm {} thành công".format(name_in_mes)}
        return {"message": message_fail}

    def update(db, model_name, model_param, param, name_in_mes, **param_list):
        # Check if exist or not exist
        get_db = crud.crud_operations.get_one_parameter(
            db, model_name, model_param, param
        )
        if get_db:
            get_db_key = [key for key in param_list.keys()]
            get_db_value = [value for value in param_list.values()]

            for idx in range(0, len(get_db_key)):
                if getattr(get_db, get_db_key[idx]) != get_db_value[idx]:
                    setattr(get_db, get_db_key[idx], get_db_value[idx])

            db.commit()
            return {"message": "Đã cập nhật"}

        return {"message": "{} không tồn tại".format(name_in_mes)}

    def delete(db, model_name, model_param, param, name_in_mes):
        delete_db = crud.crud_operations.delete(db, model_name, model_param, param)
        message_success = "Xóa {} thành công".format(name_in_mes)
        message_fail = "Xóa {} thất bại".format(name_in_mes)
        if delete_db["message"] == "Đã xóa":
            return {"message": message_success}

        return {"message": message_fail}


class product_flow:
    pass


class statistics:
    pass


# TAIKHOAN
# Need to be protected
@app.post("/login")
def account_login(
    ptentaikhoan: str = Body(..., embed=True),
    pmatkhau: str = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    db_get_taikhoan = crud.get_taikhoan_by_tentaikhoan_and_matkhau(
        db, pTenTaiKhoan=ptentaikhoan, pMatKhau=pmatkhau
    )
    if db_get_taikhoan:
        # Account found, so i need to continuouslly trying to get CapDo
        # Check if account is activated or not
        if db_get_taikhoan.isactivated == False:
            raise HTTPException(400, "Tài khoản chưa kích hoạt")

        db_get_nhanvien_capdo = crud.get_manhanvien_taikhoan_nhanvien_capdo(
            db, db_get_taikhoan.mataikhoan
        )

        if db_get_nhanvien_capdo:
            if (
                db_get_nhanvien_capdo["isStaff"] == False
            ):  # Check if account found is staff or customer
                return {
                    "success": False,
                    "message": "Tài khoản này là tài khoản khách hàng",
                }

            isAdmin = False
            if db_get_nhanvien_capdo["capdo"] == 2:
                isAdmin = True

            # Staff found -> return {"staffId": value, "isStaff": True}
            return {
                "success": True,
                "staffID": db_get_nhanvien_capdo["manhanvien"],
                "storeID": db_get_nhanvien_capdo["madaily"],
                "staffName": db_get_nhanvien_capdo["tennhanvien"],
                "isAdmin": isAdmin,
            }

        return {"success": False, "message": "Đăng nhập thất bại"}

    return {"success": False, "message": "Sai tên đăng nhập/ mật khẩu"}


@app.post("/signup")
def account_sign_up(
    tentaikhoan: str = Body(..., embed=True),
    matkhau: str = Body(..., embed=True),
    email: str = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    # Create new account
    db_add = crud.create_taikhoan(tentaikhoan, matkhau)

    match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(db_add), re.DOTALL)
    if match:
        detail = match.group(0).strip()
        if detail == "DETAIL:  Key (tentaikhoan)=({}) already exists.".format(
            tentaikhoan
        ):
            return {"message": "Tên tài khoản đã tồn tại"}

    # Link taikhoan to nhanvien
    # Check if email exists
    db_check_email = api_operations.get_one_parameter(
        db, models.Nhanvien, models.Nhanvien.email, email, "nhân viên"
    )
    if db_check_email:
        # Add a record refer to relation between staff and account in taikhoan_nhavien
        crud.link_taikhoan_nhanvien(db_add, db_check_email.manhanvien)
        return {"message": "Tạo tài khoản thành công"}
    else:
        return {"message": "Email không tồn tại trong database"}

    # Email verification feature

    # Return message


@app.get("/taikhoan")
def get_taikhoan_all(db: Session = Depends(get_db)):
    db_get_taikhoan_all = crud.get_taikhoan_all(db)
    if db_get_taikhoan_all:
        return db_get_taikhoan_all
    raise HTTPException(400, "Danh sách tài khoản rỗng")


@app.put("/taikhoan/capnhat/{manhanvien}")
async def update_taikhoan(
    manhanvien: int,
    hinhanh: Union[UploadFile, str] = File(...),
    hoten: str = Form(...),
    ngaysinh: str = Form(...),
    sodienthoai: str = Form(...),
    email: str = Form(...),
    diachi: str = Form(...),
    db: Session = Depends(get_db),
):
    try:
        # Get longtitude and latitude
        key = "dd56554106174942acce0b3bd660a32a"
        geocoder = OpenCageGeocode(key)
        query = "{}".format(diachi)
        results = geocoder.geocode(query, language="vi")
        kinhdo = results[0]["geometry"]["lng"]
        vido = results[0]["geometry"]["lat"]
        # Save image
        image_dir = ""
        if hinhanh != "undefined":
            image_dir = f"{IMAGEDIR}staffs/{hinhanh.filename}"
            contents = await hinhanh.read()
            with open(f"{IMAGEDIR}staffs/{hinhanh.filename}", "wb") as file:
                file.write(contents)

        # Save data
        param_list = {
            "manhanvien": manhanvien,
            "hoten": hoten,
            "ngaysinh": ngaysinh,
            "sodienthoai": sodienthoai,
            "email": email,
            "diachi": diachi,
            "kinhdo": kinhdo,
            "vido": vido,
            "hinhanh": image_dir,
        }
        crud.update_taikhoan(**param_list)
        return {"success": True, "message": "Cập nhật thành công."}
    except Exception as e:
        print(e)
        return {
            "success": False,
            "message": "Có lỗi xảy ra trong quá trình cập nhật. Hãy thử lại sau.",
        }

    # except Exception as e:
    #     match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
    #     detail = match.group(0).strip()

    #     if detail == "DETAIL:  Key (tenmathang)=({}) already exists.".format(
    #         tenmathang
    #     ):
    #         return {"message": "Tên mặt hàng đã tồn tại"}
    # return {"message": "Cập nhật mặt hàng thành công"}


# QUAN manipulating
@app.get("/quan")  # Used for loading page
def get_quan_all(db: Session = Depends(get_db)):
    db_get_all_quan_summary = crud.get_summary_quan()
    result = []
    for item in db_get_all_quan_summary:
        result.append(
            {
                "maquan": item[0],
                "tenquan": item[1],
                "tenthanhpho": item[2],
                "tong_so_daily": item[3],
            }
        )

    return result


@app.get("/quan/thanhpho/")  # Used for adding and updating
def get_all_quan_thanhpho(db: Session = Depends(get_db)):
    db_get_all_quan_thanhpho = crud.get_all_quan_thanhpho(db)
    if db_get_all_quan_thanhpho:
        return db_get_all_quan_thanhpho
    return {"message": "Danh sách quận rỗng"}


@app.get("/quan/quan")  # Used for adding and updating
def get_all_quan_quan(db: Session = Depends(get_db)):
    db_get_all_quan_quan = crud.get_all_quan_quan(db)
    if db_get_all_quan_quan:
        return db_get_all_quan_quan
    return {"message": "Danh sách quận rỗng"}


@app.get("/quan/maquan/{maquan}")  # Used for updating
def get_quan_by_maquan(maquan: int, db: Session = Depends(get_db)):
    return api_operations.get_one_parameter(
        db, models.Quan, models.Quan.maquan, maquan, "quận"
    )


@app.post("/quan/them")
def add_new_quan(pItem: schemas.QuanCreate, db: Session = Depends(get_db)):
    # Check if TenQuan and TenThanhPho is existed
    check_duplicate = crud.get_quan_by_tenquan_tenthanhpho(
        db, pItem.tenquan, pItem.tenthanhpho
    )
    if check_duplicate:
        return "(Quận, Thành phố) đã tồn tại"
    # If we will dont have any duplicate, we can add new QUAN
    param_list = {"tenquan": pItem.tenquan, "tenthanhpho": pItem.tenthanhpho}
    return api_operations.add(db, models.Quan, "quận", **param_list)


@app.put("/quan/capnhat/{maquan}")
def update_quan(maquan: int, pItem: schemas.QuanUpdate, db: Session = Depends(get_db)):
    param_list = {"tenquan": pItem.tenquan, "tenthanhpho": pItem.tenthanhpho}
    return api_operations.update(
        db, models.Quan, models.Quan.maquan, maquan, "quận", **param_list
    )


@app.delete("/quan/xoa/{maquan}")
def delete_quan(maquan: int, db: Session = Depends(get_db)):
    return api_operations.delete(db, models.Quan, models.Quan.maquan, maquan, "quận")


# LOAIMATHANG manipulating
@app.get("/loaimathang")
def get_loaimathang_all(db: Session = Depends(get_db)):
    return api_operations.get_all(db, models.Loaimathang, "loại mặt hàng")


@app.get("/loaimathang/tatca/tenloaimathang")
def get_all_tenloaimathang(db: Session = Depends(get_db)):
    get_db = crud.get_all_tenloaimathang(db)
    if get_db:
        results_list = [item[0] for item in get_db]
        return results_list
    return {"message": "Danh sách mặt hàng rỗng"}


@app.get("/loaimathang/maloaimathang/{maloaimathang}")
def get_loaimathang_by_maloaimathang(maloaimathang: int, db: Session = Depends(get_db)):
    return api_operations.get_one_parameter(
        db,
        models.Loaimathang,
        models.Loaimathang.maloaimathang,
        maloaimathang,
        "loại mặt hàng",
    )


@app.post("/loaimathang/them")
def add_new_loaimathang(
    ptenloaimathang: str = Body(..., embed=True), db: Session = Depends(get_db)
):
    param_list = {"tenloaimathang": ptenloaimathang}
    return api_operations.add(db, models.Loaimathang, "loại mặt hàng", **param_list)


@app.put("/loaimathang/capnhat/{maloaimathang}")
def update_loaimathang(
    maloaimathang: int,
    ptenloaimathang: str = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    param_list = {"tenloaimathang": ptenloaimathang}
    return api_operations.update(
        db,
        models.Loaimathang,
        models.Loaimathang.maloaimathang,
        maloaimathang,
        "loại mặt hàng",
        **param_list,
    )


@app.delete("/loaimathang/xoa/{maloaimathang}")
def delete_loaimathang(maloaimathang: int, db: Session = Depends(get_db)):
    return api_operations.delete(
        db,
        models.Loaimathang,
        models.Loaimathang.maloaimathang,
        maloaimathang,
        "loại mặt hàng",
    )


# MATHANG manipulating
@app.get("/mathang")
def get_mathang_all(db: Session = Depends(get_db)):
    get_db = crud.get_all_mathang(db)
    result = []
    # Convert from string to binary data with base64 encoded in field hinhanh
    if get_db:
        for item in get_db:
            if item.Mathang.hinhanh:
                with open(item.Mathang.hinhanh, "rb") as f:
                    data = f.read()
                    data_to_base64 = base64.b64encode(data)
                item.Mathang.hinhanh = data_to_base64
            Mathang_dict = item[0].__dict__.copy()
            result.append(
                {
                    "Mathang": Mathang_dict,
                    "tenloaimathang": item[1],
                    "tendaily": item[2],
                }
            )
        return result
    return {"message": "Danh sách mặt hàng rỗng"}


@app.get("/mathang/mamathang/{mamathang}")
def get_mathang_by_mamathang(mamathang: int, db: Session = Depends(get_db)):
    get_db = crud.get_mathang_by_mamathang(db, mamathang)
    if get_db:
        result = []
        db_dict = get_db.Mathang.__dict__.copy()
        if get_db.Mathang.hinhanh:
            try:
                with open(get_db.Mathang.hinhanh, "rb") as f:
                    data = f.read()
                    data_to_base64 = base64.b64encode(data)
                    db_dict["hinhanh"] = data_to_base64
            except:
                db_dict["hinhanh"] = None

        result.append(
            {
                "Mathang": db_dict,
                "tenloaimathang": get_db.tenloaimathang,
                "tendaily": get_db.tendaily,
            }
        )
        return result
    return {"message": "Danh sách mặt hàng rỗng"}


@app.get("/mathang/madaily/{madaily}")
def get_mathang_by_madaily(madaily: int, db: Session = Depends(get_db)):
    get_db = crud.get_mathang_by_madaily(db, madaily)
    if get_db:
        result = []
        for item in get_db:
            item_dict = item.Mathang.__dict__.copy()
            if item.Mathang.hinhanh:
                try:
                    with open(item.Mathang.hinhanh, "rb") as f:
                        data = f.read()
                        data_to_base64 = base64.b64encode(data)
                    item_dict["hinhanh"] = data_to_base64
                except:
                    item_dict["hinhanh"] = None
            result.append(
                {
                    "Mathang": item_dict,
                    "tenloaimathang": item.tenloaimathang,
                    "tendaily": item.tendaily,
                }
            )
        return result
    return {"message": "Danh sách mặt hàng rỗng"}


@app.post("/mathang/them")
async def add_new_mathang(
    tenmathang: str = Form(...),
    dongia: int = Form(...),
    soluongton: Decimal = Form(...),
    tendvt: str = Form(...),
    tenloaimathang: str = Form(...),
    tendaily: str = Form(...),
    hinhanh: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        # Getting maloaimathang by tenloaimathang
        pmaloaimathang = crud.get_maloaimathang_by_tenloaimathang(db, tenloaimathang)

        # Getting madaily by tendaily
        pmadaily = crud.get_madaily_by_tendaily(db, tendaily)

        # Solving image
        contents = await hinhanh.read()
        with open(f"{IMAGEDIR}products/{hinhanh.filename}", "wb") as file:
            file.write(contents)

        # Save data
        param_list = {
            "tenmathang": tenmathang,
            "soluongton": soluongton,
            "dongia": dongia,
            "tendvt": tendvt,
            "hinhanh": f"{IMAGEDIR}/products/{hinhanh.filename}",
            "madaily": pmadaily,
            "maloaimathang": pmaloaimathang,
        }
        crud.add_new_mathang(**param_list)
    except Exception as e:
        match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        detail = match.group(0).strip()

        if detail == "DETAIL:  Key (tenmathang)=({}) already exists.".format(
            tenmathang
        ):
            return {"message": "Tên mặt hàng đã tồn tại"}
    return {"message": "Thêm mặt hàng thành công"}


@app.post("/mathang_staff/them")
async def add_new_mathang(
    tenmathang: str = Form(...),
    dongia: int = Form(...),
    soluongton: Decimal = Form(...),
    tendvt: str = Form(...),
    tenloaimathang: str = Form(...),
    madaily: str = Form(...),
    hinhanh: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        # Getting maloaimathang by tenloaimathang
        pmaloaimathang = crud.get_maloaimathang_by_tenloaimathang(db, tenloaimathang)

        # Solving image
        contents = await hinhanh.read()
        with open(f"{IMAGEDIR}products/{hinhanh.filename}", "wb") as file:
            file.write(contents)

        # Save data
        param_list = {
            "tenmathang": tenmathang,
            "soluongton": soluongton,
            "dongia": dongia,
            "tendvt": tendvt,
            "hinhanh": f"{IMAGEDIR}/products/{hinhanh.filename}",
            "madaily": madaily,
            "maloaimathang": pmaloaimathang,
        }
        crud.add_new_mathang(**param_list)
    except Exception as e:
        match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        detail = match.group(0).strip()

        if detail == "DETAIL:  Key (tenmathang)=({}) already exists.".format(
            tenmathang
        ):
            return {"message": "Tên mặt hàng đã tồn tại"}
    return {"message": "Thêm mặt hàng thành công"}


@app.put("/mathang/capnhat/{mamathang}")
async def update_mathang(
    mamathang: int,
    tenmathang: str = Form(...),
    dongia: int = Form(...),
    soluongton: Decimal = Form(...),
    tendvt: str = Form(...),
    tenloaimathang: str = Form(...),
    tendaily: str = Form(...),
    hinhanh: Union[UploadFile, str] = File(...),
    db: Session = Depends(get_db),
):
    try:
        # Getting maloaimathang by tenloaimathang
        pmaloaimathang = crud.get_maloaimathang_by_tenloaimathang(db, tenloaimathang)

        # Getting madaily by tendaily
        pmadaily = crud.get_madaily_by_tendaily(db, tendaily)

        # Solving image
        image_dir = ""
        if hinhanh != "null":

            image_dir = f"{IMAGEDIR}products/{hinhanh.filename}"
            contents = await hinhanh.read()
            with open(f"{IMAGEDIR}products/{hinhanh.filename}", "wb") as file:
                file.write(contents)

        # Save data
        param_list = {
            "mamathang": mamathang,
            "tenmathang": tenmathang,
            "soluongton": soluongton,
            "dongia": dongia,
            "tendvt": tendvt,
            "hinhanh": image_dir,
            "madaily": pmadaily,
            "maloaimathang": pmaloaimathang,
        }
        crud.update_mathang(**param_list)
    except Exception as e:
        match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        detail = match.group(0).strip()

        if detail == "DETAIL:  Key (tenmathang)=({}) already exists.".format(
            tenmathang
        ):
            return {"message": "Tên mặt hàng đã tồn tại"}
    return {"message": "Cập nhật mặt hàng thành công"}


@app.put("/mathang_staff/capnhat/{mamathang}")
async def update_mathang(
    mamathang: int,
    tenmathang: str = Form(...),
    dongia: int = Form(...),
    soluongton: Decimal = Form(...),
    tendvt: str = Form(...),
    tenloaimathang: str = Form(...),
    madaily: str = Form(...),
    hinhanh: Union[UploadFile, str] = File(...),
    db: Session = Depends(get_db),
):
    try:
        # Getting maloaimathang by tenloaimathang
        pmaloaimathang = crud.get_maloaimathang_by_tenloaimathang(db, tenloaimathang)

        # Solving image
        image_dir = ""
        if hinhanh != "null":

            image_dir = f"{IMAGEDIR}products/{hinhanh.filename}"
            contents = await hinhanh.read()
            with open(f"{IMAGEDIR}products/{hinhanh.filename}", "wb") as file:
                file.write(contents)

        # Save data
        param_list = {
            "mamathang": mamathang,
            "tenmathang": tenmathang,
            "soluongton": soluongton,
            "dongia": dongia,
            "tendvt": tendvt,
            "hinhanh": image_dir,
            "madaily": madaily,
            "maloaimathang": pmaloaimathang,
        }
        crud.update_mathang(**param_list)
    except Exception as e:
        match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        detail = match.group(0).strip()

        if detail == "DETAIL:  Key (tenmathang)=({}) already exists.".format(
            tenmathang
        ):
            return {"message": "Tên mặt hàng đã tồn tại"}
    return {"message": "Cập nhật mặt hàng thành công"}


@app.delete("/mathang/xoa/{mamathang}")
def delete_mathang(mamathang: int, db: Session = Depends(get_db)):
    return api_operations.delete(
        db, models.Mathang, models.Mathang.mamathang, mamathang, "mặt hàng"
    )


# QUITAC manipulating
@app.get("/quitac")
def get_all_quitac(db: Session = Depends(get_db)):
    get_db = crud.get_all_quitac(db)
    if get_db:
        return get_db
    return {"message": "Qui tắc rỗng"}


@app.put("/quitac/capnhat")
def update_all_quitac(pItems: schemas.QUITACupdate, db: Session = Depends(get_db)):
    update_db = crud.update_quitac(db, pItems)
    if update_db == "Cập nhật thành công":
        return {"message": "Cập nhật thành công"}
    return {"message": "Cập nhật thất bại"}


# KHACHHANG manipulating
@app.get("/khachhang")
def get_all_khachhang(db: Session = Depends(get_db)):
    return api_operations.get_all(db, models.Khachhang, "khách hàng")


@app.get("/khachhang/{makhachhang}")
def get_khachhang_by_makhachhang(makhachhang: int, db: Session = Depends(get_db)):
    return api_operations.get_one_parameter(
        db, models.Khachhang, models.Khachhang.makhachhang, makhachhang, "khách hàng"
    )


@app.put("/khachhang/capnhat/{makhachhang}")
def update_khachhang(
    makhachhang: int,
    tenkhachhang: str = Body(..., embed=True),
    sodienthoai: str = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    try:
        update_db = crud.update_khachhang(db, makhachhang, tenkhachhang, sodienthoai)
    except Exception as e:
        match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        detail = match.group(0).strip()

        if detail == "DETAIL:  Key (sodienthoai)=({}) already exists.".format(
            sodienthoai
        ):
            return {"message": "Số điện thoại đã tồn tại"}
    return {"message": "Cập nhật khách hàng thành công"}


@app.delete("/khachhang/xoa/{makhachhang}")
def delete_khachhang(makhachhang: int, db: Session = Depends(get_db)):
    return api_operations.delete(
        db, models.Khachhang, models.Khachhang.makhachhang, makhachhang, "khách hàng"
    )


# LOAIDAILY manipulating
@app.get("/loaidaily")
def get_all_loaidaily(db: Session = Depends(get_db)):
    return api_operations.get_all(db, models.Loaidaily, "loại đại lý")


@app.get("/loaidaily/maloaidaily/{maloaidaily}", response_model=schemas.LOAIDAILY)
def get_loaidaily_by_maloaidaily(maloaidaily: int, db: Session = Depends(get_db)):
    return api_operations.get_one_parameter(
        db, models.Loaidaily, models.Loaidaily.maloaidaily, maloaidaily, "loại đại lý"
    )


@app.get("/loaidaily/tenloaidaily/")
def get_loaidaily_by_tenloaidaily(db: Session = Depends(get_db)):
    db_get_all_tenloaidaily = crud.get_all_tenloaidaily()
    results_list = [item[0] for item in db_get_all_tenloaidaily]
    return results_list


@app.post("/loaidaily/them")
def add_new_loaidaily(
    ptenloaidaily: str = Body(..., embed=True),
    psotiennotoida: Decimal = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    param_list = {"tenloaidaily": ptenloaidaily, "sotiennotoida": psotiennotoida}
    return api_operations.add(db, models.Loaidaily, "loại đại lý", **param_list)


@app.put("/loaidaily/capnhat/{maloaidaily}")
def update_loaidaily(
    maloaidaily: int,
    tenloaidaily: str = Body(..., embed=True),
    sotiennotoida: Decimal = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    param_list = {
        "maloaidaily": maloaidaily,
        "tenloaidaily": tenloaidaily,
        "sotiennotoida": sotiennotoida,
    }
    return api_operations.update(
        db,
        models.Loaidaily,
        models.Loaidaily.maloaidaily,
        maloaidaily,
        "loại đại lý",
        **param_list,
    )


@app.delete("/loaidaily/xoa/{maloaidaily}")
def delete_loaidaily(maloaidaily: int, db: Session = Depends(get_db)):
    return api_operations.delete(
        db, models.Loaidaily, models.Loaidaily.maloaidaily, maloaidaily, "loại đại lý"
    )


# DAILY manipulating
@app.get("/daily")
def get_daily_all(db: Session = Depends(get_db)):
    get_all_daily = crud.get_all_daily(db)
    result = []
    # Convert from image_path to image_object that can be sent to client reactjs
    if get_all_daily:
        for item in get_all_daily:
            if item.Daily.hinhanh:
                with open(item.Daily.hinhanh, "rb") as f:
                    data = f.read()
                    data_to_base64 = base64.b64encode(data)
                item.Daily.hinhanh = data_to_base64
            Daily_dict = item[0].__dict__.copy()
            result.append(
                {
                    "Daily": Daily_dict,
                    "tenloaidaily": item[1],
                    "diachi": item[2],
                    "kinhdo": item[3],
                    "vido": item[4],
                }
            )
        return result
    return {"message": "Danh sách đại lý rỗng"}


@app.get("/daily/tatca/tendaily")
def get_all_tendaily(db: Session = Depends(get_db)):
    get_db = crud.get_all_tendaily(db)
    if get_db:
        results_list = [item[0] for item in get_db]
        return results_list
    return {"message": "Danh sách đại lý rỗng"}


@app.get("/daily/madaily/{madaily}")  # Used for updating
def get_daily_by_madaily(madaily, db: Session = Depends(get_db)):
    get_db = crud.get_daily_by_madaily(madaily)
    result = []
    if get_db != []:
        for item in get_db:
            if item[7]:
                with open(item[7], "rb") as f:
                    data = f.read()
                    data_to_base64 = base64.b64encode(data)
            else:
                data_to_base64 = None
            result.append(
                {
                    "tendaily": item[0],
                    "ngaytiepnhan": item[1],
                    "tenloaidaily": item[2],
                    "sodienthoai": item[3],
                    "tenquan": item[4],
                    "tenthanhpho": item[5],
                    "diachi": item[6],
                    "hinhanh": data_to_base64,
                }
            )
        return result
    return {"message": "Không tồn tại đại lý cần tìm"}


@app.post("/daily/them")
async def add_new_daily(
    tendaily: str = Form(...),
    tenloaidaily: str = Form(...),
    ngaytiepnhan: str = Form(...),
    sodienthoai: str = Form(...),
    tenquan: str = Form(...),
    tenthanhpho: str = Form(...),
    diachi: str = Form(...),
    hinhanh: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        # Get longtitude and latitude
        key = "dd56554106174942acce0b3bd660a32a"
        geocoder = OpenCageGeocode(key)
        query = "{}".format(diachi)
        results = geocoder.geocode(query, language="vi")
        kinhdo = results[0]["geometry"]["lng"]
        vido = results[0]["geometry"]["lat"]

        # Save image
        contents = await hinhanh.read()
        with open(f"{IMAGEDIR}stores/{hinhanh.filename}", "wb") as file:
            file.write(contents)

        # Get maloaidaily through tenloaidaily
        pmaloaidaily = crud.get_maloaidaily_by_tenloaidaily(db, tenloaidaily)

        # Prepare data and add new daily
        param_list = {
            "tendaily": tendaily,
            "maloaidaily": pmaloaidaily,
            "ngaytiepnhan": ngaytiepnhan,
            "sodienthoai": sodienthoai,
            "hinhanh": f"{IMAGEDIR}stores/{hinhanh.filename}",
        }
        crud.add_daily(**param_list)

        # Add address for daily_diachi
        # Find madaily by tendaily, maquan by tenquan, tenthanhpho
        db_get_madaily = api_operations.get_one_parameter(
            db, models.Daily, models.Daily.tendaily, tendaily, "đại lý"
        )
        db_get_maquan = crud.get_maquan_by_tenquan_tenthanhpho(db, tenquan, tenthanhpho)

        # Solving address information before adding
        diachi = diachi + ", " + tenquan + ", " + tenthanhpho
        param_list_diachi = {
            "madaily": db_get_madaily.madaily,
            "maquan": db_get_maquan,
            "diachi": diachi,
            "kinhdo": kinhdo,
            "vido": vido,
        }
        api_operations.add(
            db, models.DailyDiachi, "đại lý địa chỉ", **param_list_diachi
        )
    except Exception as e:
        match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        if match != None:
            detail = match.group(0).strip()
            if detail == "DETAIL:  Key (tendaily)=({}) already exists.".format(
                tendaily
            ):
                return {"message": "Tên đại lý đã tồn tại"}
            elif detail == "DETAIL:  Key (sodienthoai)=({}) already exists.".format(
                sodienthoai
            ):
                return {"message": "Số điện thoại đã tồn tại"}
            elif detail == "DETAIL:  Key (diachi)=({}) already exists.".format(diachi):
                api_operations.delete(
                    db,
                    models.Daily,
                    models.Daily.madaily,
                    db_get_madaily.madaily,
                    "đại lý",
                )
                db.commit()
                return {"message": "Địa chỉ đã tồn tại"}
            else:
                return {"message": "Thêm đại lý thất bại"}
        # Check trigger constraint
        match_trigger = re.search(
            r"psycopg2.errors.RaiseException\) (.+?)(?:\n|$)", str(e), re.DOTALL
        )
        if match_trigger != None:
            detail_trigger = match_trigger.group(1)
            if (
                detail_trigger
                == "Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!"
            ):
                return {"message": "Số điện thoại đã tồn tại"}
            else:
                return {"message": "Thêm đại lý thất bại"}
    return {"message": "Thêm đại lý thành công"}


@app.put("/daily/capnhat/{madaily}")
async def update_daily(
    madaily: int,
    tendaily: str = Form(...),
    tenloaidaily: str = Form(...),
    ngaytiepnhan: str = Form(...),
    sodienthoai: str = Form(...),
    tenquan: str = Form(...),
    tenthanhpho: str = Form(...),
    diachi: str = Form(...),
    hinhanh: Union[UploadFile, str] = File(...),
    db: Session = Depends(get_db),
):
    try:
        # Get longtitude and latitude
        key = "dd56554106174942acce0b3bd660a32a"
        geocoder = OpenCageGeocode(key)
        query = "{}".format(diachi)
        results = geocoder.geocode(query, language="vi")
        kinhdo = results[0]["geometry"]["lng"]
        vido = results[0]["geometry"]["lat"]

        # Solve problem with image
        if hinhanh == "null":
            hinhanh_dir = ""
        else:
            # Save Image data in local - in real job, this mean the image will be saved on server machine
            contents = await hinhanh.read()
            with open(f"{IMAGEDIR}stores/{hinhanh.filename}", "wb") as file:
                file.write(contents)
            hinhanh_dir = f"{IMAGEDIR}stores/{hinhanh.filename}"
            # Check if existed data is the same with new data -> no need to check, this task will be check in database postgresql

        # Update Daily
        pmaloaidaily = crud.get_maloaidaily_by_tenloaidaily(db, tenloaidaily)

        # Prepare data and add new daily && updaload image
        param_list = {
            "tendaily": tendaily,
            "maloaidaily": pmaloaidaily,
            "ngaytiepnhan": ngaytiepnhan,
            "sodienthoai": sodienthoai,
            "madaily": madaily,
            "hinhanh": hinhanh_dir,
        }
        crud.update_daily(**param_list)

        # Update DailyDiachi
        # Get maquan by tenquan, tenthanhpho
        get_maquan = crud.get_maquan_by_tenquan_tenthanhpho(db, tenquan, tenthanhpho)

        diachi = diachi + ", " + tenquan + ", " + tenthanhpho
        param_list_dc = {
            "madaily": madaily,
            "maquan": get_maquan,
            "diachi": diachi,
            "kinhdo": kinhdo,
            "vido": vido,
        }
        api_operations.update(
            db,
            models.DailyDiachi,
            models.DailyDiachi.madaily,
            madaily,
            "địa chỉ đại lý",
            **param_list_dc,
        )
    except Exception as e:
        # Get error from server
        match = re.search(r"DETAIL:\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        if match != None:
            detail = match.group(0).strip()
            # Send error message to Client
            if detail == "DETAIL:  Key (tendaily)=({}) already exists.".format(
                tendaily
            ):
                return {"message": "Tên đại lý đã tồn tại"}
            elif detail == "DETAIL:  Key (sodienthoai)=({}) already exists.".format(
                sodienthoai
            ):
                return {"message": "Số điện thoại đã tồn tại"}
            elif detail == "DETAIL:  Key (diachi)=({}) already exists.".format(diachi):
                return {"message": "Địa chỉ đã tồn tại"}
            else:
                # Send message that annouces success
                return {"message": "Đại lý cập nhật thất bại"}
        # Check trigger constraint
        match_trigger = re.search(
            r"psycopg2.errors.RaiseException\) (.+?)(?:\n|$)", str(e), re.DOTALL
        )
        if match_trigger != None:
            detail_trigger = match_trigger.group(1)
            if (
                detail_trigger
                == "Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!"
            ):
                return {"message": "Số điện thoại đã tồn tại"}
            else:
                return {"message": "Đại lý cập nhật thất bại"}
    return {"message": "Đại lý cập nhật thành công"}


@app.delete("/daily/xoa/{madaily}")
def delete_daily(madaily: int, db: Session = Depends(get_db)):
    # Delete DAILY - this will automatically delete DAILY_DIACHI too
    return api_operations.delete(
        db, models.Daily, models.Daily.madaily, madaily, "đại lý"
    )


# BAOTRIDAILY manipulating
@app.post("/daily/baotri/them")
def add_baotri(
    madaily: int = Body(..., embed=True),
    chiphibaotri: Decimal = Body(..., embed=True),
    chiphidukien: Decimal = Body(..., embed=True),
    mota: str = Body(..., embed=True),
    thoidiembatdau: datetime = Body(..., embed=True),
    thoidiemketthuc: datetime = Body(..., embed=True),
    db: Session = Depends(get_db),
):
    param_list = {
        "madaily": madaily,
        "chiphibaotri": chiphibaotri,
        "chiphidukien": chiphidukien,
        "mota": mota,
        "thoidiembatdau": thoidiembatdau,
        "thoidiemketthuc": thoidiemketthuc,
    }

    return api_operations.add(db, models.Baotridaily, "bảo trì đại lý", **param_list)


@app.get("/daily/baotri/{madaily}")
def get_baotri_bu_madaily(madaily: int, db: Session = Depends(get_db)):
    get_db = crud.get_baotri_by_madaily(db, madaily)
    if get_db:
        return get_db
    return {"message": "Danh sách bảo trì rỗng"}


# NHANVIEN manipulating
@app.get("/nhanvien")
def get_nhanvien_all(db: Session = Depends(get_db)):
    get_db = crud.get_all_nhanvien(db)
    result = []
    if get_db:
        for item in get_db:
            if item.Nhanvien.hinhanh:
                with open(item.Nhanvien.hinhanh, "rb") as f:
                    data = f.read()
                    data_to_base64 = base64.b64encode(data)
                item.Nhanvien.hinhanh = data_to_base64
            Nhanvien_dict = item[0].__dict__.copy()
            result.append(
                {
                    "Nhanvien": Nhanvien_dict,
                    "tenchucvu": item[1],
                    "diachi": item[2],
                    "tendaily": item[3],
                    "kinhdo": item[4],
                    "vido": item[5],
                }
            )
        return result
    return {"message": "Danh sách nhân viên rỗng"}


@app.get("/nhanvien/manhanvien/{manhanvien}")
def get_nhanvien_by_manhanvien(manhanvien: int, db: Session = Depends(get_db)):
    get_db = crud.get_nhanvien_by_manhanvien(db, manhanvien)
    result = []
    if get_db:
        if get_db[0].hinhanh:
            with open(get_db[0].hinhanh, "rb") as f:
                data = f.read()
                data_to_base64 = base64.b64encode(data)
            get_db[0].hinhanh = data_to_base64
        Nhanvien_dict = get_db[0].__dict__.copy()
        result.append(
            {
                "Nhanvien": Nhanvien_dict,
                "tenquan": get_db[1],
                "tenthanhpho": get_db[2],
                "tendaily": get_db[3],
                "tenchucvu": get_db[4],
                "diachi": get_db[5],
            }
        )
        return result
    return {"message": "Danh sách nhân viên rỗng"}


@app.get("/nhanvien/chitiet/{manhanvien}")
def get_nhanvien_detail_by_id(manhanvien: int, db: Session = Depends(get_db)):
    get_db = crud.get_nhanvien_chitiet_by_manhanvien(db, manhanvien)
    response_data = []
    if get_db:
        if get_db[0]:
            with open(get_db[0], "rb") as f:
                data = f.read()
                data_to_base64 = base64.b64encode(data)
        else:
            data_to_base64 = None

        response_data.append(
            {
                "hoten": get_db[1],
                "ngaysinh": get_db[2],
                "sodienthoai": get_db[3],
                "email": get_db[4],
                "diachi": get_db[5],
                "tenchucvu": get_db[6],
                "capdo": get_db[7],
                "luong": get_db[8],
                "ngaybatdau": get_db[9],
                "thoihan": get_db[10],
                "tendaily": get_db[11],
                "avatar": data_to_base64,
            }
        )
        return response_data
    return {"message": "Không tim thấy nhân viên"}


@app.post("/nhanvien/them")
async def add_new_nhanvien(
    diachi: str = Form(...),
    email: str = Form(...),
    tendaily: str = Form(...),
    ngaysinh: str = Form(...),
    sodienthoai: str = Form(...),
    tenchucvu: str = Form(...),
    tennhanvien: str = Form(...),
    tenquan: str = Form(...),
    tenthanhpho: str = Form(...),
    hinhanh: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:  # Get longtitude and latitude
        key = "dd56554106174942acce0b3bd660a32a"
        geocoder = OpenCageGeocode(key)
        query = "{}".format(diachi)
        results = geocoder.geocode(query, language="vi")
        kinhdo = results[0]["geometry"]["lng"]
        vido = results[0]["geometry"]["lat"]

        # Getting madaily & machucvu & maquan using tendaily + tenquan
        pmadaily = crud.get_madaily_by_tendaily(db, tendaily)
        pmachuvu = crud.get_machucvu_by_tenchucvu(db, tenchucvu)
        pmaquan = crud.get_maquan_by_tenquan_tenthanhpho(db, tenquan, tenthanhpho)
        # Save image
        contents = await hinhanh.read()
        with open(f"{IMAGEDIR}staffs/{hinhanh.filename}", "wb") as file:
            file.write(contents)
        # Prepare data and add new nhanvien
        param_list_nhanvien = {
            "hoten": tennhanvien,
            "madaily": pmadaily,
            "ngaysinh": ngaysinh,
            "sodienthoai": sodienthoai,
            "email": email,
            "hinhanh": f"{IMAGEDIR}staffs/{hinhanh.filename}",
        }
        # Getting id of currently inserted staff
        pmanhanvien = crud.add_nhanvien(**param_list_nhanvien)
        # Add staff's address information
        diachi = diachi + "," + tenquan + ", " + tenthanhpho
        param_list_diachi = {
            "manhanvien": pmanhanvien,
            "maquan": pmaquan,
            "diachi": diachi,
            "kinhdo": kinhdo,
            "vido": vido,
        }
        api_operations.add(
            db, models.NhanvienDiachi, "nhân viên địa chỉ", **param_list_diachi
        )
        # Prepare data for staff's position
        param_list_position = {
            "manhanvien": pmanhanvien,
            "machucvu": pmachuvu,
        }
        api_operations.add(
            db, models.NhanvienChucvu, "nhân viên chức vụ", **param_list_position
        )
    except Exception as e:
        match = re.search(r"DETAIL\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        if match != None:
            detail = match.group(0).strip()
            # Returning error message
            if detail == "DETAIL:  Key (sodienthoai)=({}) already exists.".format(
                sodienthoai
            ):
                return {"message": "Số điện thoại đã tồn tại"}
            elif detail == "DETAIL:  Key (email)=({}) already exists.".format(email):
                return {"message": "Email đã tồn tại"}
            else:
                {"message": "Thêm nhân viên thất bại"}
        # Check trigger constraint
        match_trigger = re.search(
            r"psycopg2.errors.RaiseException\) (.+?)(?:\n|$)", str(e), re.DOTALL
        )
        if match_trigger != None:
            detail_trigger = match_trigger.group(1)
            if (
                detail_trigger
                == "Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!"
            ):
                return {"message": "Số điện thoại đã tồn tại"}
            else:
                return {"message": "Thêm nhân viên thất bại"}
    return {"message": "Thêm nhân viên thành công"}


@app.put("/nhanvien/capnhat/{manhanvien}")
async def update_nhanvien(
    manhanvien: int,
    diachi: str = Form(...),
    email: str = Form(...),
    tendaily: str = Form(...),
    ngaysinh: str = Form(...),
    sodienthoai: str = Form(...),
    tenchucvu: str = Form(...),
    tennhanvien: str = Form(...),
    tenquan: str = Form(...),
    tenthanhpho: str = Form(...),
    hinhanh: Union[UploadFile, str] = File(...),
    db: Session = Depends(get_db),
):
    try:
        # Get longtitude and latitude
        key = "dd56554106174942acce0b3bd660a32a"
        geocoder = OpenCageGeocode(key)
        query = "{}".format(diachi)
        results = geocoder.geocode(query, language="vi")
        kinhdo = results[0]["geometry"]["lng"]
        vido = results[0]["geometry"]["lat"]
        # Getting madaily & machucvu & maquan using tendaily + tenquan
        pmadaily = crud.get_madaily_by_tendaily(db, tendaily)
        pmachuvu = crud.get_machucvu_by_tenchucvu(db, tenchucvu)
        pmaquan = crud.get_maquan_by_tenquan_tenthanhpho(db, tenquan, tenthanhpho)
        # Save image
        image_dir = ""
        if hinhanh != "null":
            image_dir = f"{IMAGEDIR}staffs/{hinhanh.filename}"
            contents = await hinhanh.read()
            with open(f"{IMAGEDIR}staffs/{hinhanh.filename}", "wb") as file:
                file.write(contents)

        # Prepare data and add new nhanvien
        param_list_nhanvien = {
            "hoten": tennhanvien,
            "madaily": pmadaily,
            "ngaysinh": ngaysinh,
            "sodienthoai": sodienthoai,
            "email": email,
            "hinhanh": image_dir,
        }
        # Getting id of currently inserted staff
        crud.update_nhanvien(manhanvien, **param_list_nhanvien)
        # Add staff's address information
        diachi = diachi + "," + tenquan + ", " + tenthanhpho
        param_list_diachi = {
            "maquan": pmaquan,
            "diachi": diachi,
            "kinhdo": kinhdo,
            "vido": vido,
        }
        api_operations.update(
            db,
            models.NhanvienDiachi,
            models.NhanvienDiachi.manhanvien,
            manhanvien,
            "nhân viên",
            **param_list_diachi,
        )
        # Prepare data for staff's position
        param_list_position = {
            "machucvu": pmachuvu,
        }
        api_operations.update(
            db,
            models.NhanvienChucvu,
            models.NhanvienChucvu.manhanvien,
            manhanvien,
            "nhân viên",
            **param_list_position,
        )
    except Exception as e:
        # Check non-trigger constraint
        match = re.search(r"DETAIL\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        if match != None:
            detail = match.group(0).strip()
            # Returning error message
            if detail == "DETAIL:  Key (sodienthoai)=({}) already exists.".format(
                sodienthoai
            ):
                return {"message": "Số điện thoại đã tồn tại"}
            elif detail == "DETAIL:  Key (email)=({}) already exists.".format(email):
                return {"message": "Email đã tồn tại"}
            else:
                {"message": "Cập nhật nhân viên thất bại"}
        # Check trigger constraint
        match_trigger = re.search(
            r"psycopg2.errors.RaiseException\) (.+?)(?:\n|$)", str(e), re.DOTALL
        )
        if match_trigger != None:
            detail_trigger = match_trigger.group(1)
            if (
                detail_trigger
                == "Số điện thoại đã tồn tại trong bảng. Giao dịch bị hủy!"
            ):
                return {"message": "Số điện thoại đã tồn tại"}
            else:
                return {"message": "Cập nhật nhân viên thất bại"}
    return {"message": "Cập nhật nhân viên thành công"}


@app.delete("/nhanvien/xoa/{manhanvien}")
def delete_nhanvien(manhanvien: int, db: Session = Depends(get_db)):
    return api_operations.delete(
        db, models.Nhanvien, models.Nhanvien.manhanvien, manhanvien, "nhân viên"
    )


# CHUCVU manipulating
@app.get("/chucvu")
def get_chucvu_all(db: Session = Depends(get_db)):
    return api_operations.get_all(db, models.Chucvu, "chức vụ")


@app.get("/chucvu/tenchucvu")
def get_all_tenchucvu(db: Session = Depends(get_db)):
    get_db = crud.get_all_tenchucvu(db)
    if get_db:
        results_list = [item[0] for item in get_db]
        return results_list
    return {"message": "Danh sách chức vụ rỗng"}


@app.post("/chucvu/them")
def add_new_chucvu(
    tenchucvu: str = Form(...),
    capdo: int = Form(...),
    luong: Decimal = Form(...),
    db: Session = Depends(get_db),
):
    param_list = {"tenchucvu": tenchucvu, "luong": luong, "capdo": capdo}
    result = api_operations.add(db, models.Chucvu, "chức vụ", **param_list)
    if result["message"] == "Thêm chức vụ thất bại do chức vụ đã tồn tại":
        return {"message": "Thêm chức vụ thất bại do chức vụ đã tồn tại"}
    elif result["message"] == "Thêm chức vụ thành công":
        return {"message": "Thêm chức vụ thành công"}
    else:
        return {"message": "Thêm chức vụ thất bại"}


@app.get("/chucvu/machucvu/{machucvu}")
def get_chucvu_by_machucvu(machucvu: int, db: Session = Depends(get_db)):
    return api_operations.get_one_parameter(
        db, models.Chucvu, models.Chucvu.machucvu, machucvu, "chức vụ"
    )


@app.put("/chucvu/capnhat/{machucvu}")
def update_chucvu(
    machucvu: int,
    tenchucvu: str = Form(...),
    capdo: int = Form(...),
    luong: Decimal = Form(...),
    db: Session = Depends(get_db),
):
    try:
        param_list = {
            "tenchucvu": tenchucvu,
            "luong": luong,
            "capdo": capdo,
            "ngaycapnhat": datetime.today().strftime("%Y-%m-%d"),
        }
        crud.update_chucvu(machucvu, **param_list)
    except Exception as e:
        match = re.search(r"DETAIL\s*(.*?)(?=\n|$)", str(e), re.DOTALL)
        detail = match.group(0).strip()
        if detail == "DETAIL:  Key (tenchucvu)=({}) already exists.".format(tenchucvu):
            return {"message": "Cập nhật chức vụ thất bại do chức vụ đã tồn tại"}
        else:
            return {"message": "Cập nhật chức vụ thất bại"}
    return {"message": "Cập nhật chức vụ thành công"}


@app.delete("/chucvu/xoa/{machucvu}")
def delete_chucvu(machucvu: int, db: Session = Depends(get_db)):
    return api_operations.delete(
        db, models.Chucvu, models.Chucvu.machucvu, machucvu, "chức vụ"
    )


# PHIEUNHAPHANG & CHITIET_PNH manipulating
@app.get("/phieunhaphang")
def get_phieunhaphang_all(db: Session = Depends(get_db)):
    get_all_phieunhaphang = crud.get_all_phieunhaphang(db)
    result = []
    # Sent to client reactjs
    if get_all_phieunhaphang:
        for item in get_all_phieunhaphang:
            Phieunhaphang_dict = item[0].__dict__.copy()
            result.append(
                {
                    "Phieunhaphang": Phieunhaphang_dict,
                    "tendaily": item[1],
                }
            )
        return result
    return {"message": "Danh sách phiếu nhập hàng rỗng"}


@app.get("/phieunhaphang/maphieunhap/{maphieunhap}")
def get_chitiet_pnh_by_maphieunhap(maphieunhap: int, db: Session = Depends(get_db)):
    get_db = crud.get_chitiet_pnh_by_maphieunhap(db, maphieunhap)
    result = []
    if get_db:
        for item in get_db:
            Chitiet_pnh_dict = item[0].__dict__.copy()
            result.append(
                {
                    "Chitiet_pnh": Chitiet_pnh_dict,
                    "tenmathang": item[1],
                }
            )
        return result
    return {"message": "Danh sách chi tiết phiếu nhập hàng rỗng"}


# PHIEUXUATHANG & CHITIET_PXH manipulating
@app.get("/phieuxuathang")
def get_phieuxuathang_all(db: Session = Depends(get_db)):
    get_all_phieuxuathang = crud.get_all_phieuxuathang(db)
    result = []
    # Sent to client reactjs
    if get_all_phieuxuathang:
        for item in get_all_phieuxuathang:
            Phieuxuathang_dict = item[0].__dict__.copy()
            result.append(
                {
                    "Phieuxuathang": Phieuxuathang_dict,
                    "tendaily": item[1],
                    "tenkhachhang": item[2],
                }
            )
        return result
    return {"message": "Danh sách phiếu xuất hàng rỗng"}


@app.get("/phieuxuathang/maphieuxuat/{maphieuxuat}")
def get_chitiet_pxh_by_maphieuxuat(maphieuxuat: int, db: Session = Depends(get_db)):
    get_db = crud.get_chitiet_pxh_by_maphieuxuat(db, maphieuxuat)
    result = []
    if get_db:
        for item in get_db:
            Chitiet_pxh_dict = item[0].__dict__.copy()
            result.append(
                {
                    "Chitiet_pxh": Chitiet_pxh_dict,
                    "tenmathang": item[1],
                }
            )
        return result
    return {"message": "Danh sách chi tiết phiếu nhập hàng rỗng"}
