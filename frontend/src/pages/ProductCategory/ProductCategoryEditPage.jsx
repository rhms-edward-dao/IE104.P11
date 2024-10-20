import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import ReturnIcon from "../../images/icons/return-button.png";

import Header from "../../components/Header";
import {
  updateOneCategory,
  getProductTypeById,
} from "../../assets/TypeOfProduct";

function WarehousesEditPage() {
  // Variables
  const [productCategoryName, setProductCategoryName] = useState("");
  const { categoryId } = useParams();

  // Variables for using navigation
  const navigate = useNavigate();

  // Function for updating data
  useEffect(() => {
    const fetchExistData = async (id) => {
      const data = await getProductTypeById(id);
      setProductCategoryName(data.tenloaimathang);
    };
    fetchExistData(categoryId);
  }, []);

  const updateData = async (id, tenloaimathang) => {
    const data = await updateOneCategory(id, tenloaimathang);
    if (data.message === "Đã cập nhật") {
      alert("Loại mặt hàng cập nhật thành công");
      navigate("/product-categorys");
    } else if (data.message === "loại mặt hàng không tồn tại") {
      alert("Loại mặt hàng không tồn tài");
    } else {
      alert("Cập nhật loại mặt hàng thất bại");
    }
  };

  // Return render
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <hr />

      <div>
        <div>
          <div className="flex items-center gap-40">
            <NavLink to={"/product-categorys"}>
              <button>
                <img
                  src={ReturnIcon}
                  alt="Icon trở lại"
                  className="w-15 h-12"
                />
              </button>
            </NavLink>
          </div>
          <div className="flex mt-5">
            <div className="w-1/2">
              <p className="text-xl font-bold italic">
                Chỉnh sửa loại mặt hàng
              </p>
            </div>
            <div className="w-1/2 flex justify-end mr-5">
              <button
                className="px-2 py-3 bg-red-500 rounded rounded-xl"
                onClick={() => updateData(categoryId, productCategoryName)}
              >
                <p className="font-bold text-white text-lg">Cập nhật</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="m-5">
        <div className="block">
          <label
            htmlFor="product-category-name-edit"
            className="font-bold text-lg"
          >
            Tên loại mặt hàng
          </label>
          <br />
          <input
            id="product-category-name-edit"
            name="product-category-name-edit"
            type="text"
            className="w-full py-2 text-lg border border-black rounded-lg"
            placeholder="   Tên loại mặt hàng..."
            value={productCategoryName}
            onChange={(e) => setProductCategoryName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default WarehousesEditPage;
