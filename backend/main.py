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

# IMAGEDIR = "/home/kui/Documents/backend_projects/Inventory_management/backend/inventory-app/images/"
IMAGEDIR = r"D:\Studying Documents\CV Project Applied\Inventory_management_Backup\backend\inventory-app\images"

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
class api_operations():
    def get_all(db, model_name, name_in_mes):
        get_db = crud.crud_operations.get_all(db, model_name)
        if get_db:
            return get_db
        
        return {
            'message': 'Danh sách {} rỗng'.format(name_in_mes)
        }        

    def get_one_parameter(db, model_name, model_param, param, name_in_mes):
        get_db = crud.crud_operations.get_one_parameter(db, model_name, model_param, param)
        if get_db:
            return get_db
        
        return {
            'message': 'Không tìm thấy {}'.format(name_in_mes)
        }
    
    def add(db, model_name, name_in_mes, **param_list):
        # if any unique attribute will become duplicate, an message will be returned from database
        new_db_item = model_name(**param_list)
        add_db = crud.crud_operations.add(db, new_db_item)
        message_fail = 'Thêm {} thất bại do {} đã tồn tại'.format(name_in_mes, name_in_mes)
        if add_db:
            return {
                'message': 'Thêm {} thành công'.format(name_in_mes)
            }
        return {
            'message': message_fail
        }

    def update(db, model_name, model_param, param, name_in_mes, **param_list):
        # Check if exist or not exist
        get_db = crud.crud_operations.get_one_parameter(db, model_name, model_param, param)
        if get_db:
            get_db_key = [key for key in param_list.keys()]
            get_db_value = [value for value in param_list.values()]

            for idx in range(0, len(get_db_key)):
                if getattr(get_db, get_db_key[idx]) != get_db_value[idx]:
                    setattr(get_db, get_db_key[idx], get_db_value[idx])
            
            db.commit()
            return {
                "message": "Đã cập nhật"
            }
        
        return {
            'message': "{} không tồn tại".format(name_in_mes)
        }

    def delete(db, model_name, model_param, param, name_in_mes):
        delete_db = crud.crud_operations.delete(db, model_name, model_param, param)
        message_success = 'Xóa {} thành công'.format(name_in_mes)
        message_fail = 'Xóa {} thất bại'.format(name_in_mes)
        if delete_db["message"] == "Đã xóa":
            return {
                "message": message_success
            }
        
        return {
            'message': message_fail
        }
      
class product_flow():
    pass
class statistics():
    pass
# TAIKHOAN
# Need to be protected
@app.post("/login")
def account_login(ptentaikhoan: str = Body(..., embed=True), pmatkhau: str = Body(..., embed=True), db: Session = Depends(get_db)): 
    db_get_taikhoan = crud.get_taikhoan_by_tentaikhoan_and_matkhau(db, pTenTaiKhoan=ptentaikhoan, pMatKhau=pmatkhau)
    if db_get_taikhoan:
        # Account found, so i need to continuouslly trying to get CapDo
        # Check if account is activated or not
        if db_get_taikhoan.isactivated == False:
            raise HTTPException(400, "Tài khoản chưa kích hoạt")
        
        db_get_nhanvien_capdo = crud.get_manhanvien_taikhoan_nhanvien_capdo(db, db_get_taikhoan.mataikhoan)

        if db_get_nhanvien_capdo:
            if db_get_nhanvien_capdo["isStaff"] == False: # Check if account found is staff or customer
                return {
                    "success": False,
                    "message": "Tài khoản này là tài khoản khách hàng"
                }
    
            isAdmin = False
            if db_get_nhanvien_capdo["capdo"] == 2:
                isAdmin = True                

            # Staff found -> return {"staffId": value, "isStaff": True}
            return {
                "success": True,
                "staffID": db_get_nhanvien_capdo["manhanvien"],
                "staffName": db_get_nhanvien_capdo["tennhanvien"],
                "isAdmin": isAdmin
            }        
        
        return {
            "success": False,
            "message": "Đăng nhập thất bại"
        }
    
    return {
        "success": False,
        "message": "Sai tên đăng nhập/ mật khẩu"
    }
@app.post("/sign-up")
def account_sign_up(ptaikhoan: schemas.TaikhoanCreate = Depends(), db: Session = Depends(get_db)):
    # Add username and password and the status of new account will be {"isActivated": False}
    # Check if username is exist
    db_get_all_tentaikhoan = crud.get_tentaikhoan(db, pTenTaiKhoan=ptaikhoan.tentaikhoan)
    if db_get_all_tentaikhoan:
        raise HTTPException(400, "Tên tài khoản này đã tồn tại")

    # After checking -> go to inserting operation
    db_add_new_account = crud.add_new_taikhoan(db, Item=ptaikhoan)
    if db_add_new_account:
        # Insert successfully -> return message
        # After inserting new account -> send email for verification (via google email)
        return "Tài khoản thêm thành công. Bạn hãy vào gmail để kích hoạt tài khoản"
    raise HTTPException(400, "Thêm tài khoản thất bại")

@app.get("/taikhoan")
def get_taikhoan_all(db: Session = Depends(get_db)):
    db_get_taikhoan_all = crud.get_taikhoan_all(db)
    if db_get_taikhoan_all:
        return db_get_taikhoan_all
    raise HTTPException(400, "Danh sách tài khoản rỗng")
@app.put("/taikhoan/capnhat/{mataikhoan}", response_model=schemas.TAIKHOAN)
def update_account(ptaikhoan: schemas.TAIKHOAN = Depends(), db: Session = Depends(get_db)):
    # Check if taikhoan exist
    db_get_taikhoan_by_mataikhoan = crud.get_taikhoan_by_mataikhoan(db, pMaTaiKhoan=ptaikhoan.mataikhoan)
    if db_get_taikhoan_by_mataikhoan:
        db_update_taikhoan = crud.update_taikhoan(db, ptaikhoan)
        if db_update_taikhoan:
            return db_update_taikhoan
        raise HTTPException(400, "Cập nhật tài khoản thất bại")
    raise HTTPException(400, "Tài khoản không tồn tại")
@app.delete("/taikhoan/xoa/{mataikhoan}")
def delete_taikhoan(pmataikhoan: str, db: Session = Depends(get_db)):
    # Check if account exist or not
    db_get_taikhoan_by_mataikhoan = crud.get_taikhoan_by_mataikhoan(db, pmataikhoan)
    if db_get_taikhoan_by_mataikhoan:
        db_delete_taikhoan = crud.delete_taikhoan(db, pMaTaiKhoan=pmataikhoan)
        if db_delete_taikhoan["message"] == "Đã xóa tài khoản":
            return "Xóa tài khoản thành công"
        raise HTTPException(400, "Xóa tài khoản")        
    raise HTTPException(400, "Tài khoản không tồn tại")
    
# QUAN manipulating
@app.get("/quan") # Used for loading page
def get_quan_all(db: Session = Depends(get_db)):
    db_get_all_quan_summary = crud.get_summary_quan()
    return db_get_all_quan_summary
@app.get("/quan/thanhpho/") # Used for adding and updating
def get_all_quan_thanhpho(db: Session = Depends(get_db)):
    db_get_all_quan_thanhpho = crud.get_all_quan_thanhpho(db)
    if db_get_all_quan_thanhpho:
        return db_get_all_quan_thanhpho
    return {
        "message": "Danh sách quận rỗng"
    }
@app.get("/quan/quan") # Used for adding and updating
def get_all_quan_quan(db: Session = Depends(get_db)):
    db_get_all_quan_quan = crud.get_all_quan_quan(db)
    if db_get_all_quan_quan:
        return db_get_all_quan_quan
    return {
        "message": "Danh sách quận rỗng"
    }
@app.get("/quan/maquan/{maquan}") # Used for updating
def get_quan_by_maquan(maquan: int, db: Session = Depends(get_db)):
    return api_operations.get_one_parameter(db, models.Quan, models.Quan.maquan, maquan, 'quận')
@app.post("/quan/them")
def add_new_quan(pItem: schemas.QuanCreate, db: Session = Depends(get_db)):
    # Check if TenQuan and TenThanhPho is existed
    check_duplicate = crud.get_quan_by_tenquan_tenthanhpho(db, pItem.tenquan, pItem.tenthanhpho)
    if check_duplicate:
        return "(Quận, Thành phố) đã tồn tại"    
    # If we will dont have any duplicate, we can add new QUAN
    param_list = {"tenquan": pItem.tenquan, "tenthanhpho": pItem.tenthanhpho}
    return api_operations.add(db, models.Quan, 'quận', **param_list)        
@app.put("/quan/capnhat/{maquan}")
def update_quan(maquan: int, pItem: schemas.QuanUpdate, db: Session = Depends(get_db)):
    param_list = {"tenquan": pItem.tenquan, "tenthanhpho": pItem.tenthanhpho}
    return api_operations.update(db, models.Quan, models.Quan.maquan, maquan, 'quận', **param_list)
@app.delete("/quan/xoa/{maquan}")
def delete_quan(maquan: int, db: Session = Depends(get_db)):
    return api_operations.delete(db, models.Quan, models.Quan.maquan, maquan, 'quận')    

# LOAIMATHANG manipulating
@app.get("/loaimathang")
def get_loaimathang_all(db: Session = Depends(get_db)):
    return api_operations.get_all(db, models.Loaimathang, 'loại mặt hàng')
@app.get("/loaimathang/tatca/tenloaimathang")
def get_all_tenloaimathang(db: Session = Depends(get_db)):
    get_db = crud.get_all_tenloaimathang(db)
    if get_db:
        results_list = [item[0] for item in get_db]
        return results_list
    return {
        "message": "Danh sách mặt hàng rỗng"
    }
@app.get("/loaimathang/maloaimathang/{maloaimathang}", response_model=schemas.LOAIMATHANG)
def get_loaimathang_by_maloaimathang(maloaimathang: int, db: Session = Depends(get_db)):
    return api_operations.get_one_parameter(db, models.Loaimathang, models.Loaimathang.maloaimathang, maloaimathang, 'loại mặt hàng')
@app.post("/loaimathang/them")
def add_new_loaimathang(ptenloaimathang: str = Body(..., embed=True), db: Session = Depends(get_db)):
    param_list = {"tenloaimathang": ptenloaimathang}
    return api_operations.add(db, models.Loaimathang, 'loại mặt hàng', **param_list)
@app.put("/loaimathang/capnhat/{maloaimathang}")
def update_loaimathang(maloaimathang: int, ptenloaimathang: str = Body(..., embed=True), db: Session = Depends(get_db)):
    param_list = {"tenloaimathang": ptenloaimathang}
    return api_operations.update(db, models.Loaimathang, models.Loaimathang.maloaimathang, maloaimathang, 'loại mặt hàng', **param_list)
@app.delete("/loaimathang/xoa/{maloaimathang}")
def delete_loaimathang(maloaimathang: int, db: Session = Depends(get_db)):
    return api_operations.delete(db, models.Loaimathang, models.Loaimathang.maloaimathang, maloaimathang, 'loại mặt hàng')

# MATHANG manipulating
@app.get("/mathang")
def get_mathang_all(db: Session = Depends(get_db)):
    get_db = crud.get_all_mathang(db)
    # Convert from string to binary data with base64 encoded in field hinhanh
    if get_db:
        for item in get_db:
            if item.Mathang.hinhanh:
                with open(item.Mathang.hinhanh, "rb") as f:
                    data = f.read()
                    data_to_base64 = base64.b64encode(data)
                item.Mathang.hinhanh = data_to_base64
        return get_db
    return {
        "message": "Danh sách mặt hàng rỗng"
    }
@app.get("/mathang/mamathang/{mamathang}")
def get_mathang_by_mamathang(mamathang: int, db: Session = Depends(get_db)):
    get_db = crud.get_mathang_by_mamathang(db, mamathang)
    if get_db:
        if get_db[0].hinhanh:
            with open(get_db[0].hinhanh, "rb") as f:
                data = f.read()
                data_to_base64 = base64.b64encode(data)
            get_db[0].hinhanh = data_to_base64
        return get_db
    return {
        "message": "Danh sách mặt hàng rỗng"
    } 
@app.post("/mathang/them")
async def add_new_mathang(
    tenmathang: str = Form(...),
    dongia: int = Form(...),
    soluongton: Decimal = Form(...),
    tendvt: str = Form(...),
    tenloaimathang: str = Form(...),
    tendaily: str = Form(...),
    hinhanh: UploadFile = File(...),
    db: Session = Depends(get_db)
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
            "hinhanh": f"{IMAGEDIR}products/{hinhanh.filename}",
            "madaily": pmadaily,
            "maloaimathang": pmaloaimathang
        }
        crud.add_new_mathang(**param_list)
    except Exception as e:
        match = re.search(r'DETAIL:\s*(.*?)(?=\n|$)', str(e), re.DOTALL)
        detail = match.group(0).strip()

        if detail == "DETAIL:  Key (tenmathang)=({}) already exists.".format(tenmathang):
            return {
                "message": "Tên mặt hàng đã tồn tại"
            }
    return {
        "message": "Thêm mặt hàng thành công"
    }
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
    db: Session = Depends(get_db)
):
    try:
        # Getting maloaimathang by tenloaimathang
        pmaloaimathang = crud.get_maloaimathang_by_tenloaimathang(db, tenloaimathang)
        
        # Getting madaily by tendaily
        pmadaily = crud.get_madaily_by_tendaily(db, tendaily)

        # Solving image
        image_dir = ''
        if hinhanh != 'null':
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
            "maloaimathang": pmaloaimathang
        }
        crud.update_mathang(**param_list)
    except Exception as e:
        match = re.search(r'DETAIL:\s*(.*?)(?=\n|$)', str(e), re.DOTALL)
        detail = match.group(0).strip()

        if detail == "DETAIL:  Key (tenmathang)=({}) already exists.".format(tenmathang):
            return {
                "message": "Tên mặt hàng đã tồn tại"
            }
    return {
        "message": "Cập nhật mặt hàng thành công"
    }
@app.delete("/mathang/xoa/{mamathang}")
def delete_mathang(mamathang: int, db: Session = Depends(get_db)):
    return api_operations.delete(db, models.Mathang, models.Mathang.mamathang, mamathang, 'mặt hàng')

# KHACHHANG manipulating
@app.get("/khachhang")
def get_all_khachhang(db: Session = Depends(get_db)):
    return api_operations.get_all(db, models.Khachhang, 'khách hàng')
@app.delete("/khachhang/xoa/{makhachhang}")
def delete_khachhang(makhachhang: int, db: Session = Depends(get_db)):
    return api_operations.delete(db, models.Khachhang, models.Khachhang.makhachhang, makhachhang, 'khách hàng')

# Functions for export/ import here

