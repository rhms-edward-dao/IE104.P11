// FUNCTIONS FOR WAREHOUSE HERE
// // Import Bills
export const getAllImportBill = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/phieunhaphang`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const getImportBillByBillId = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieunhaphang/maphieunhap/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const getImportBillByStoreId = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieunhaphang/madaily/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const addImportBill = async (id, item) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieunhaphang/them/madaily/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate JSON payload
        },
        body: JSON.stringify({ items: item }), // Send item array as JSON
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const updateImportBill = async (id, item) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieunhaphang/capnhat/maphieunhap/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Indicate JSON payload
        },
        body: JSON.stringify({ items: item }), // Send item array as JSON
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const deleteImportBill = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieunhaphang/xoa/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

// // Detail Import Bills
export const getImportBillDetail = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieunhaphang/ctphieunhap/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

// // Export Bills
export const getAllExportBill = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/phieuxuathang`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const getExportBillByBillId = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieuxuathang/maphieuxuat/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const getExportBillByStoreId = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieuxuathang/madaily/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const addExportBill = async (id, customer, item) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieuxuathang/them/madaily/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate JSON payload
        },
        body: JSON.stringify({ customerId: customer, items: item }), // Send item array as JSON
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const updateExportBill = async (id, customer) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieuxuathang/capnhat/maphieuxuat/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Indicate JSON payload
        },
        body: JSON.stringify({ customerId: customer }), // Send item array as JSON
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const deleteExportBill = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieuxuathang/xoa/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

// // Detail Export Bills
export const getExportBillDetail = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/phieuxuathang/ctphieuxuat/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};
