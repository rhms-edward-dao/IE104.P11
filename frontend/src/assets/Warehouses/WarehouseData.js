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

export const getImportBillDetail = async (id) => {
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

export const getExportBillDetail = async (id) => {
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
