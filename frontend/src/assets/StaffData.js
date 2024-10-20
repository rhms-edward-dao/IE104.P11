// FUNCTIONS FOR STAFF HERE
export const getAllStaff = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/nhanvien`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getStaffById = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/nhanvien/manhanvien/${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getStaffDetail = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/nhanvien/chitiet/${id}`);
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error("Fetch error: ", error);
    }
}

export const addStaff = async(item) => {
    try {
        // Prepare data before sending to server
        const formData = new FormData();
        formData.append("hinhanh", item.hinhanh, item.hinhanh.name);
        formData.append("diachi", item.diachi);
        formData.append("email", item.email);
        formData.append("tendaily", item.tendaily);
        formData.append("ngaysinh", item.ngaysinh);
        formData.append("sodienthoai", item.sodienthoai);
        formData.append("tenchucvu", item.tenchucvu);
        formData.append("tennhanvien", item.tennhanvien);
        formData.append("tenquan", item.tenquan);
        formData.append("tenthanhpho", item.tenthanhpho);
        // Send data to server
        const response = await fetch(`http://127.0.0.1:8000/nhanvien/them`, {
            method: 'POST',
            body: formData,
        })
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const updateStaff = async(id, item) => {
    try {    
        let formData = new FormData();
        if (item.hinhanh === null) formData.append("hinhanh", item.hinhanh);
        else formData.append("hinhanh", item.hinhanh, item.hinhanh.name);                    
        formData.append("diachi", item.diachi);
        formData.append("email", item.email);
        formData.append("tendaily", item.tendaily);
        formData.append("ngaysinh", item.ngaysinh);
        formData.append("sodienthoai", item.sodienthoai);
        formData.append("tenchucvu", item.tenchucvu);
        formData.append("tennhanvien", item.tennhanvien);
        formData.append("tenquan", item.tenquan);
        formData.append("tenthanhpho", item.tenthanhpho);
        console.log(formData);
        // Send data to server
        const response = await fetch(`http://127.0.0.1:8000/nhanvien/capnhat/${id}`, {
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

export const deleteStaff = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/nhanvien/xoa/${id}`, {
            method: 'DELETE'            
        })
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
};

// FUNCTIONS FOR POSITION HERE
export const getAllPosition = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/chucvu`)
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getPositionById = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/chucvu/machucvu/${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getAllPositionName = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/chucvu/tenchucvu`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const addPosition = async(item) => {
    try {
        const formData = new FormData()
        formData.append("tenchucvu", item.tenchucvu);
        formData.append("capdo", item.capdo);
        formData.append("luong", item.luong);
        formData.append("thoihan", item.thoihan);
        const response = await fetch(`http://127.0.0.1:8000/chucvu/them`, {
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

export const updatePosition = async(machucvu, item) => {
    try {
        const formData = new FormData()
        formData.append("tenchucvu", item.tenchucvu);
        formData.append("capdo", item.capdo);
        formData.append("luong", item.luong);
        formData.append("thoihan", item.thoihan);
        const response = await fetch(`http://127.0.0.1:8000/chucvu/capnhat/${machucvu}`, {
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

export const deletePosition = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/chucvu/xoa/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};