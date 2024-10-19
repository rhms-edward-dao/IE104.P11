import Header from "../components/content/Header";

function ProductsEditPage() {
  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <hr />
      <div></div>
      <div className="m-5">
        <div className="block py-5">
          <label htmlFor="product-name-edit" className="font-bold text-xl">
            Tên mặt hàng
          </label>
          <br />
          <input
            id="product-name-edit"
            name="product-name-edit"
            type="text"
            className="w-full py-2 border border-black rounded-lg text-lg"
            placeholder="   Tên mặt hàng..."
          />
        </div>
        <div className="block py-5">
          <label htmlFor="left-amount-edit" className="font-bold text-xl">
            Số lượng tồn
          </label>
          <br />
          <input
            id="left-amount-edit"
            name="left-amount-edit"
            type="number"
            className="w-full py-2 border border-black rounded-lg text-lg"
          />
        </div>
        <div className="block py-5">
          <label htmlFor="unit-edit" className="font-bold text-xl">
            Đơn vị tính
          </label>
          <br />
          <input
            id="unit-edit"
            name="unit-edit"
            type="text"
            className="w-full py-2 border border-black rounded-lg text-lg"
            placeholder="   Số điện thoại..."
          />
        </div>
        <div className="block py-5">
          <label
            htmlFor="upload-image-product-edit"
            className="font-bold text-xl"
          >
            Tải hình lên
          </label>
          <br />
          <input
            type="file"
            id="upload-image-product-edit"
            name="upload-image-product-edit"
            accept="image/"
            className="text-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsEditPage;
