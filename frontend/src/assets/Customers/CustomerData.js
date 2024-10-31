export const getAllCustomer = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/khachhang`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getCustomerById = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/khachhang/${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const updateCustomer = async(id, tenkhachhang, sodienthoai) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/khachhang/capnhat/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "tenkhachhang": tenkhachhang,
                "sodienthoai": sodienthoai
            })
        })
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Update error: ", error);
    }
};

export const deleteCustomer = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/khachhang/xoa/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Delete error: ", error);
    }
};
