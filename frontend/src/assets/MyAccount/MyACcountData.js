export const updateAccount = async (id, item) => {
    try {
      let formData = new FormData();
      if (item.hinhanh === undefined) formData.append("hinhanh", item.hinhanh);
      else formData.append("hinhanh", item.hinhanh, item.hinhanh.name);      
      formData.append("hoten", item.hoten);
      formData.append("ngaysinh", item.ngaysinh);
      formData.append("sodienthoai", item.sodienthoai);
      formData.append("email", item.email);
      formData.append("diachi", item.diachi);      
      // Send data to server
      const response = await fetch(
        `http://127.0.0.1:8000/taikhoan/capnhat/${id}`,
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