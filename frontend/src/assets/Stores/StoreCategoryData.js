export const getAllStoreCategory = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/loaidaily`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const getStoreCategoryById = async(maloaidaily) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/loaidaily/maloaidaily/${maloaidaily}`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("fetch error: ", error);
    }
};

export const getAllStoreName = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/loaidaily/tenloaidaily/`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const addStoreCategory = async(tenloaidaily, sotiennotoida) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/loaidaily/them`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "ptenloaidaily": tenloaidaily,
                "psotiennotoida": sotiennotoida,
            })
        });
        const data = await response.json();
        return data;        
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const updateStoreCategory = async(id, tenloaidaily, sotiennotoida) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/loaidaily/capnhat/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "tenloaidaily": tenloaidaily,
                "sotiennotoida": sotiennotoida,
            })
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const deleteStoreCategory = async(id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/loaidaily/xoa/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Fetch error: ", error);
    }
};
