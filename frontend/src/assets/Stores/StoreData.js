export const getAllStore = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/daily`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getAllStoreName = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/daily/tatca/tendaily`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
};

export const getStoreById = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/daily/madaily/${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const addStore = async(item) => {
    try {
        const formData = new FormData();
        formData.append("hinhanh", item.hinhanh, item.hinhanh.name);
        formData.append("tendaily", item.tendaily)
        formData.append("tenloaidaily", item.loaidaily)
        formData.append("ngaytiepnhan", item.ngaytiepnhan)
        formData.append("sodienthoai", item.sodienthoai)
        formData.append("tenquan", item.tenquan)
        formData.append("tenthanhpho", item.tenthanhpho)
        formData.append("diachi", item.diachi)

        const response = await fetch(`http://127.0.0.1:8000/daily/them`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const updateStore = async(madaily, item) => {
    try {     
        // Prepare data for sending (via FormData)
        const formData = new FormData();
        if (item.hinhanh !== null) {
            formData.append("hinhanh", item.hinhanh, item.hinhanh.name);
        }
        else {
            formData.append("hinhanh", item.hinhanh);
        }

        formData.append("tendaily", item.tendaily)
        formData.append("tenloaidaily", item.loaidaily)
        formData.append("ngaytiepnhan", item.ngaytiepnhan)
        formData.append("sodienthoai", item.sodienthoai)
        formData.append("tenquan", item.tenquan)
        formData.append("tenthanhpho", item.tenthanhpho)
        formData.append("diachi", item.diachi)

        const response = await fetch(`http://127.0.0.1:8000/daily/capnhat/${madaily}`, {
            method: 'PUT',
            body: formData
        });        
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const deleteStore = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/daily/xoa/${id}`, { method: 'DELETE' })
        const data = await response.json();
        return data;
    }
    catch (error ) {
        console.error("Fetch error: ", error);
    }
};

// Maintainance api
export const addMaintainanceApi = async(item) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/daily/baotri/them`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "madaily": item.madaily,
                "chiphidukien": item.chiphi,
                "mota": item.mota,
                "thoidiembatdau": item.ngaybatdau,
                "thoidiemketthuc": item.ngayketthuc,
                "chiphibaotri": item.chiphibaotri
            })
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Adding error: ", error);
    }
};

export const getMaintainanceApi = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/daily/baotri/${id}`,{
            method: 'GET'
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Adding error: ", error);
    }
};