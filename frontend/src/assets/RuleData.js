export const getAllRule = async() => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/quitac`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};

export const updateRule = async(sothietbitoidataikhoan, sodailytoidamoiquan, tiledongiaban) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/quitac/capnhat`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "sothietbitoidataikhoan": sothietbitoidataikhoan,
                "sodailytoidamoiquan": sodailytoidamoiquan,
                "tiledongiaban": tiledongiaban
            })
        })
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
    }
};