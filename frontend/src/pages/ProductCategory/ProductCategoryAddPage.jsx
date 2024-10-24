import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ReturnIcon from "../../images/icons/return-button.png";
import Header from "../../components/Header";

import { addOneCategory } from "../../assets/TypeOfProduct";

function ProductCategorysAddPage() {
  // Variable for adding here
  const [productCategoryName, setProductCategoryName] = useState("");
  // Variables here
  const navigate = useNavigate();

  // Function for adding here
  const addData = async (tenloaimathang) => {
    if (tenloaimathang.length < 1) {
      alert("Tên loại mặt hàng không được để rỗng");
    } else {
      const data = await addOneCategory(tenloaimathang);
      if (
        data.message ===
        "Thêm loại mặt hàng thất bại do loại mặt hàng đã tồn tại"
      ) {
        alert("Thêm loại mặt hàng thất bại do loại mặt hàng đã tồn tại");
      } else {
        alert("Thêm loại mặt hàng thành công");
        // Navigate back to product category page
        navigate("/product-categorys");
      }
    }
  };
  // Return render here
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
              <p className="text-xl font-bold italic">{"Thêm loại mặt hàng"}</p>
            </div>
            <div className="w-1/2 flex justify-end mr-5">
              <button
                className="px-2 py-3 bg-red-500 rounded-xl"
                onClick={() => addData(productCategoryName)}
              >
                <p className="font-bold text-white text-lg">Thêm</p>
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
            id="store-name-edit"
            name="product-category-name-edit"
            type="text"
            className="w-full py-2 text-lg border border-black rounded-lg"
            placeholder="   Tên loại mặt hàng..."
            values={productCategoryName}
            onChange={(e) => setProductCategoryName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCategorysAddPage;
