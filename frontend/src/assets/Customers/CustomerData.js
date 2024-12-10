export const getAllCustomer = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/khachhang`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const getCustomerById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/khachhang/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const addCustomer = async (item) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/khachhang/them`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate JSON payload
      },
      body: JSON.stringify({ items: item }), // Send item array as JSON
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const updateCustomer = async (id, item) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/khachhang/capnhat/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "tenkhachhang": item.tenkhachhang,
          "sodienthoai": item.sodienthoai,
          "diachi": item.diachi,
          "maquan": item.maquan
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Update error: ", error);
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/khachhang/xoa/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Delete error: ", error);
  }
};
