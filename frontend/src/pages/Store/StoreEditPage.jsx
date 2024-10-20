import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import ReturnIcon from "../../images/icons/return-button.png";
import Header from "../../components/Header";

import { getStoreById, updateStore } from "../../assets/StoreData";

function StoreCategoryAddPage() {
  //  Variables here
  const { storeId } = useParams();
  const [storeName, setStoreName] = useState("");

  const [catName, setCatName] = useState("");
  const [catNameData, setCatNameData] = useState([]);

  const [phoneNum, setPhoneNum] = useState("");
  const [dateReceive, setDateReceive] = useState("");

  const [districtName, setDistrictName] = useState("");
  const [districtData, setDistrictData] = useState([]);

  const [cityName, setCityName] = useState("");
  const [cityData, setCityData] = useState([]);

  const [address, setAddress] = useState("");

  const [imageData, setImageData] = useState();
  const [image, setImage] = useState();

  const navigate = useNavigate();

  //  Functions here
  useEffect(() => {
    const fetchStoreCategory = async (id) => {
      //  Set data as existed data in database
      const existed_data = await getStoreById(id);
      if (existed_data.message === "Không tồn tại đại lý cần tìm") {
        alert("Không tồn tại đại lý cần tìm");
      } else {
        setStoreName(existed_data.Daily[0].tendaily);

        setCatName(existed_data.Daily[0].tenloaidaily);
        setCatNameData([existed_data.Daily[0].tenloaidaily]);

        setDateReceive(existed_data.Daily[0].ngaytiepnhan);

        setPhoneNum(existed_data.Daily[0].sodienthoai);

        setDistrictName(existed_data.Daily[0].tenquan);
        setDistrictData([existed_data.Daily[0].tenquan]);

        setCityName(existed_data.Daily[0].tenthanhpho);
        setCityData([existed_data.Daily[0].tenthanhpho]);

        // Solving address before assigning
        setAddress(
          existed_data.Daily[0].diachi.split(",").slice(0, 2).join(", ")
        );
        if (existed_data.hinhanh !== null) {
          setImageData(existed_data.hinhanh);
        }
      }
    };
    fetchStoreCategory(storeId);
  }, []);

  // Need to be complete
  const handleUploadImage = (e) => {
    setImageData(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const updateData = async (
    madaily,
    tendaily,
    tenloaidaily,
    ngaytiepnhan,
    sodienthoai,
    tenquan,
    tenthanhpho,
    diachi,
    hinhanh
  ) => {
    let check_tendaily = true;
    let check_tenloaidaily = true;
    let check_sodienthoai = true;
    let check_diachi = true;
    let check_hinhanh = true;
    console.log(hinhanh);
    // Constraints for checking format
    const isOnlyDigit = (input) => /^\d+$/.test(input);

    // Checking before calling add api
    // Check tendaily
    if (tendaily.length < 1) {
      alert("Tên đại lý không được rỗng");
      check_tendaily = false;
    } else if (tendaily.length > 100) {
      alert("Tên đại lý quá dài");
      check_tendaily = false;
    }
    // Check Loaidaily
    if (tenloaidaily.length < 1) {
      alert("Tên loại đại lý không được rỗng");
      check_tenloaidaily = false;
    } else if (tenloaidaily.length > 100) {
      alert("Tên loại đại lý quá dài");
      check_tenloaidaily = false;
    }
    // Check sodienthoai
    if (sodienthoai.length < 10) {
      alert("Số điện thoại tối thiểu p hải có 10 chữ số");
      check_sodienthoai = false;
    } else if (sodienthoai.length > 15) {
      alert("Số điện thoại quá dài");
      check_sodienthoai = false;
    } else {
      if (!isOnlyDigit(sodienthoai)) {
        alert("Số điện thoại chỉ được có ký tự chữ số");
        check_sodienthoai = false;
      }
    }
    // Check diachi
    const countComma = (input) => {
      let commaCount = parseInt(0);
      let input_length = input.length;
      for (let i = 0; i < input_length; i++) {
        if (input[i] === ",") {
          commaCount++;
        }
      }
      return commaCount;
    };
    if (countComma(diachi) === 0) {
      alert("Địa chỉ nhập tới phường");
      check_diachi = false;
    } else if (countComma(diachi) > 1) {
      alert("Địa chỉ chỉ nhập tới phường");
      check_diachi = false;
    } else {
      const isToWardFormat = (input) => /^\s+\S+(?: \S+)*$/.test(input);
      const isAddressFormat = (input) => {
        let input_split = input.split(",");
        if (input_split[1] === "") return 1;
        if (!isToWardFormat(input_split[1])) return -1;
      };
      if (isAddressFormat(diachi) === -1) {
        alert("Nhập phường sai");
        check_diachi = false;
      } else if (isAddressFormat(diachi) === 1) {
        alert("Chưa nhập phường");
        check_diachi = false;
      } else {
        if (diachi.length < 1) {
          alert("Địa chỉ không được rỗng");
          check_diachi = false;
        } else if (diachi.length > 200) {
          alert("Địa chỉ nhập vào quá dài");
          check_diachi = false;
        }
      }
    }
    // Check hinhanh
    if (hinhanh === undefined) {
      alert("Chưa chọn hình ảnh");
      check_hinhanh = false;
    }

    if (
      check_tendaily &&
      check_tenloaidaily &&
      check_sodienthoai &&
      check_diachi &&
      check_hinhanh
    ) {
      let item = {
        tendaily: tendaily,
        loaidaily: tenloaidaily,
        ngaytiepnhan: ngaytiepnhan,
        sodienthoai: sodienthoai,
        tenquan: tenquan,
        tenthanhpho: tenthanhpho,
        diachi: diachi,
        hinhanh: hinhanh,
      };
      if (image === undefined) {
        item.hinhanh = null;
      }

      const data = await updateStore(madaily, item);
      if (data.message === "Tên đại lý đã tồn tại") {
        alert("Tên đại lý đã tồn tại");
      } else if (data.message === "Số điện thoại đã tồn tại") {
        alert("Số điện thoại đã tồn tại");
      } else if (data.message === "Địa chỉ đã tồn tại") {
        alert("Địa chỉ đã tồn tại");
      } else if (data.message === "Đại lý cập nhật thất bại") {
        alert("Đại lý cập nhật thất bại");
      } else if (data.message === "Đại lý cập nhật thành công") {
        alert("Đại lý cập nhật thành công");
        navigate("/stores");
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
        <div className="flex items-center gap-40">
          <NavLink to={"/stores"}>
            <button>
              <img src={ReturnIcon} alt="Icon trở lại" className="w-15 h-12" />
            </button>
          </NavLink>
        </div>
        <div className="flex mt-5">
          <div className="w-1/2">
            <p className="text-xl font-bold italic">{"Cập nhật đại lý"}</p>
          </div>
          <div className="w-1/2 flex justify-end mr-5">
            <button
              className="px-2 py-3 bg-red-500 rounded rounded-xl"
              onClick={() =>
                updateData(
                  storeId,
                  storeName,
                  catName,
                  dateReceive,
                  phoneNum,
                  districtName,
                  cityName,
                  address,
                  imageData
                )
              }
            >
              <p className="font-bold text-white text-lg">Cập nhật</p>
            </button>
          </div>
        </div>
      </div>
      <div className="m-5">
        <div className="block">
          <label htmlFor="store-name-edit" className="font-bold text-lg">
            Tên đại lý
          </label>
          <br />
          <input
            id="store-name-add"
            name="store-name-add"
            type="text"
            className="w-full py-2 text-lg border border-black rounded-lg"
            placeholder="   Tên đại lý..."
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>

        <div className="block py-5">
          <label htmlFor="cat-name-add" className="font-bold text-lg">
            Loại đại lý
          </label>
          <br />
          <select
            name="cat-name-add"
            id="cat-name-add"
            className="px-5 py-3 rounded bg-stone-300"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          >
            {catNameData.map((item) => (
              <>
                <option key={item} value={item}>
                  {item}
                </option>
              </>
            ))}
          </select>
        </div>

        <div className="block py-5">
          <label htmlFor="date-received-edit" className="font-bold text-lg">
            Ngày tiếp nhận
          </label>
          <br />
          <input
            id="date-received-edit"
            name="date-received-edit"
            type="date"
            className="px-5 py-3 rounded bg-stone-300"
            value={dateReceive}
            onChange={(e) => setDateReceive(e.target.value)}
          />
        </div>

        <div className="block py-5">
          <label htmlFor="phone-number-add" className="font-bold text-lg">
            Số điện thoại
          </label>
          <br />
          <input
            id="phone-number-add"
            name="phone-number-add"
            type="text"
            className="w-full py-2 text-lg border border-black rounded-lg"
            placeholder="   Số điện thoại..."
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap space-x-20">
          {/* Chọn thành phố */}
          <div className="block py-5">
            <label htmlFor="city-name-add" className="font-bold text-lg">
              Thành phố
            </label>
            <br />
            <select
              id="city-name-add"
              name="city-name-add"
              type="text"
              className="px-5 py-3 rounded bg-stone-300"
              value={cityName}
              onChange={(e) => setPhoneNum(e.target.value)}
            >
              {cityData.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn quận */}
          <div className="block py-5">
            <label htmlFor="district-name-add" className="font-bold text-lg">
              Quận
            </label>
            <br />
            <select
              id="district-name-add"
              name="district-name-add"
              type="text"
              className="px-5 py-3 rounded bg-stone-300"
              value={districtName}
              onChange={(e) => setPhoneNum(e.target.value)}
            >
              {districtData.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="block py-5">
          <label htmlFor="address-edit" className="font-bold text-lg">
            Địa chỉ (tới phường)
          </label>
          <br />
          <input
            name="address-edit"
            id="address-edit"
            className="w-full py-2 text-lg border border-black rounded-lg"
            placeholder="   Ví dụ: số nhà tên đường, phường"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="block py-5">
          <label
            htmlFor="upload-image-store-edit"
            className="font-bold text-xl"
          >
            Tải hình lên
          </label>
          <br />
          <input
            type="file"
            id="upload-image-store-edit"
            name="upload-image-store-edit"
            accept="image/*"
            className="text-lg"
            onChange={handleUploadImage}
          />
          {image ? (
            <img
              width={"250px"}
              src={image}
              alt="Hình ảnh đại lý"
              className="rounded"
            ></img>
          ) : (
            <img
              width={"250px"}
              src={`data:image/jpeg;base64, ${imageData}`}
              alt="Hình ảnh đại lý"
              className="rounded"
            ></img>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreCategoryAddPage;
