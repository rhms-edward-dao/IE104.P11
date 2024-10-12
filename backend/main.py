from fastapi import FastAPI, Depends, Body, UploadFile, File, Form
from typing import Union
from sqlalchemy.orm import Session
import models, schemas, crud
from database import Session

# import jwt
from decimal import Decimal
from fastapi.middleware.cors import CORSMiddleware

import re, base64

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


@app.get(
    "/loaimathang/maloaimathang/{maloaimathang}", response_model=schemas.LOAIMATHANG
)
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
    # Convert from string to binary data with base64 encoded in field hinhanh
    if get_db:
        for item in get_db:
            if item.Mathang.hinhanh:
                with open(item.Mathang.hinhanh, "rb") as f:
                    data = f.read()
                    data_to_base64 = base64.b64encode(data)
                item.Mathang.hinhanh = data_to_base64
        return get_db
    return {"message": "Danh sách mặt hàng rỗng"}


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
            "hinhanh": f"{IMAGEDIR}products/{hinhanh.filename}",
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


@app.delete("/mathang/xoa/{mamathang}")
def delete_mathang(mamathang: int, db: Session = Depends(get_db)):
    return api_operations.delete(
        db, models.Mathang, models.Mathang.mamathang, mamathang, "mặt hàng"
    )


# Functions for export/ import here
