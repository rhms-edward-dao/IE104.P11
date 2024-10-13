export const getAllDistrict = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/quan");    
        const data = await response.json();
        if (data.message === "Danh sách quận rỗng") {
            return [];
         }
         return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getAllCityName = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/quan/thanhpho");
        const data = await response.json();
        if (data.message === "Danh sách quận rỗng") {
            return [];
        }
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getAllDistrictName = async() => {
    try {
        const response = await fetch("http://127.0.0.1:8000/quan/quan")
        const data = await response.json();
        if (data.message === "Danh sách quận rỗng") {
            return [];
        }
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getDistrictById = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/quan/maquan/${id}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const addDistrict = async (tenquan, tenthanhpho) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/quan/them`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "tenquan": tenquan,
                "tenthanhpho": tenthanhpho,
            })
        })
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const updateDistrict = async (id, tenquan, tenthanhpho) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/quan/capnhat/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({                
                "tenquan": tenquan,
                "tenthanhpho": tenthanhpho
            })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const deleteDistrict = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/quan/xoa/${id}`, {method: 'DELETE'});
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};