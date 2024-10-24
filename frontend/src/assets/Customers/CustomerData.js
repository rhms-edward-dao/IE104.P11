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

export const deleteCustomer = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/khachhang/xoa/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};
