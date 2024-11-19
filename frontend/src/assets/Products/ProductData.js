export const getAllProducts = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/mathang`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/mathang/mamathang/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const getProductByStoreId = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/mathang/madaily/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const addProduct = async (item) => {
  try {
    const formData = new FormData();
    formData.append("hinhanh", item.hinhanh, item.hinhanh.name);
    formData.append("tenmathang", item.tenmathang);
    formData.append("tenloaimathang", item.tenloaimathang);
    formData.append("tendaily", item.tendaily);
    formData.append("dongia", item.dongia);
    formData.append("soluongton", item.soluongton);
    formData.append("tendvt", item.tendvt);

    const response = await fetch(`http://127.0.0.1:8000/mathang/them`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const updateProduct = async (id, item) => {
  try {
    const formData = new FormData();
    if (item.hinhanh === null) {
      formData.append("hinhanh", item.hinhanh);
    } else {
      formData.append("hinhanh", item.hinhanh, item.hinhanh.name);
    }
    formData.append("tenmathang", item.tenmathang);
    formData.append("tenloaimathang", item.tenloaimathang);
    formData.append("tendaily", item.tendaily);
    formData.append("dongia", item.dongia);
    formData.append("soluongton", item.soluongton);
    formData.append("tendvt", item.tendvt);

    const response = await fetch(
      `http://127.0.0.1:8000/mathang/capnhat/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/mathang/xoa/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};


// For staff only
export const addProductOnlyProduct = async (item) => {
  try {
    const formData = new FormData();
    formData.append("hinhanh", item.hinhanh, item.hinhanh.name);
    formData.append("tenmathang", item.tenmathang);
    formData.append("tenloaimathang", item.tenloaimathang);
    formData.append("madaily", item.madaily);
    formData.append("dongia", item.dongia);
    formData.append("soluongton", item.soluongton);
    formData.append("tendvt", item.tendvt);

    const response = await fetch(`http://127.0.0.1:8000/mathang_staff/them`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const updateProductOnlyStaff = async (id, item) => {
  try {
    const formData = new FormData();
    if (item.hinhanh === null) {
      formData.append("hinhanh", item.hinhanh);
    } else {
      formData.append("hinhanh", item.hinhanh, item.hinhanh.name);
    }
    formData.append("tenmathang", item.tenmathang);
    formData.append("tenloaimathang", item.tenloaimathang);
    formData.append("madaily", item.madaily);
    formData.append("dongia", item.dongia);
    formData.append("soluongton", item.soluongton);
    formData.append("tendvt", item.tendvt);

    const response = await fetch(
      `http://127.0.0.1:8000/mathang_staff/capnhat/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};