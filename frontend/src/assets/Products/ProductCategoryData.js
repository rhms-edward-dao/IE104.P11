export const getAllTypeOfProduct = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/loaimathang");
    const data = await response.json();
    if (data.message === "Danh sách loại mặt hàng rỗng") {
      return [];
    }
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const getAllCategoryName = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/loaimathang/tatca/tenloaimathang`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductTypeById = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/loaimathang/maloaimathang/${id}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const addOneCategory = async (tenloaimathang) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/loaimathang/them`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ptenloaimathang: tenloaimathang,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch error: ", error);
  }
};

export const updateOneCategory = async (id, tenloaimathang) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/loaimathang/capnhat/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ptenloaimathang: tenloaimathang,
        }),
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const deleteOneCategory = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/loaimathang/xoa/${id}`,
      { method: "DELETE" },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};
