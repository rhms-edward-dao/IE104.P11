import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ReturnIcon from "../../images/icons/return-button.png";
import Header from "../../components/Header";

import { getAllCityName, addDistrict } from "../../assets/StoreDistrict";

function StoreDistrictAddPage() {
  // Variable for adding here
  const [districtName, setDistrictName] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityData, setCityData] = useState([]);

  // Variables here
  const navigate = useNavigate();

  // Function for adding here
  useEffect(() => {
    const fetchAllCityName = async () => {
      const data = await getAllCityName();
      setCityData(data);
      setCityName(data[0]);
    };
    fetchAllCityName();
  }, []);

  const addData = async (tenquan, tenthanhpho) => {
    if (tenquan.length < 1) {
      alert("Tên quận không được để trống");
    } else {
      const data = await addDistrict(tenquan, tenthanhpho);
      if (data === "(Quận, Thành phố) đã tồn tại") {
        alert("(Quận, Thành phố) đã tồn tại");
      } else {
        alert("Thêm quận thành công");
        navigate("/districts");
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
            <NavLink to={"/districts"}>
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
              <p className="text-xl font-bold italic">{"Thêm quận"}</p>
            </div>
            <div className="w-1/2 flex justify-end mr-5">
              <button
                className="px-2 py-3 bg-red-500 rounded rounded-xl"
                onClick={() => addData(districtName, cityName)}
              >
                <p className="font-bold text-white text-lg">Thêm</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5">
        <div className="block space-y-8">
          <div className="space-y-4">
            <label htmlFor="district-name-add" className="font-bold text-lg">
              Tên quận
            </label>
            <br />
            <input
              id="district-name-add"
              name="district-name-add"
              type="text"
              className="w-full py-2 text-lg border border-black rounded-lg"
              placeholder="   Tên quận..."
              values={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="city-name-add" className="font-bold text-lg">
              Tên thành phố
            </label>
            <br />
            {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
            <select
              id="city-name-add"
              name="city-name-add"
              className="px-5 py-3 rounded bg-stone-300"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            >
              {cityData.map((item) => (
                <>
                  <option key={item} value={item}>
                    {item}
                  </option>
                </>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDistrictAddPage;
