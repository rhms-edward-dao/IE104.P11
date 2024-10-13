import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import ReturnIcon from '../../images/icons/return-button.png';
import Header from "../../components/content/Header";

import { getAllCityName, updateDistrict, getDistrictById } from "../../assets/StoreDistrict";

function StoreDistrictEditPage() {
    // Variable for adding here
    const [districtName, setDistrictName] = useState('');
    const [cityName, setCityName] = useState('');
    const [cityData, setCityData] = useState([]);    

    // Variables here
    const navigate = useNavigate();
    const { districtId } = useParams();

    // Function for editing here
    useEffect(() => {
        const fetchAllCityName = async () => {
            const data = await getAllCityName();
            setCityData(data);
            setCityName(data[0]);      
            
            const existed_data = await getDistrictById(districtId);
            setDistrictName(existed_data.tenquan);
        }
        fetchAllCityName();        
    }, []);


    const updateData = async (id, tenquan, tenthanhpho) => {
        if (tenquan.length < 1) {
            alert("Tên quận không thể rỗng")
        }
        else {
            const data = await updateDistrict(id, tenquan, tenthanhpho);
            if (data.message === "Đã cập nhật") {
                alert("Cập nhật quận thành công");
                navigate("/districts");
            }
            else if (data.message === "quận không tồn tại") {
                alert("Quận không tồn tại");
            }
            else {
                alert("Cập nhật quận thất bại");
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
                    <div className='flex items-center gap-40'>
                        <NavLink
                            to={"/districts"}
                        >
                            <button>
                                <img 
                                    src={ReturnIcon} 
                                    alt="Icon trở lại"   
                                    className='w-15 h-12'
                                />
                            </button>
                        </NavLink>
                    </div>        
                    <div className='flex mt-5'>
                        <div className='w-1/2'>
                            <p className='text-xl font-bold italic'>{"Thêm quận"}</p>
                        </div>
                        <div className='w-1/2 flex justify-end mr-5'>
                            <button 
                                className='px-2 py-3 bg-red-500 rounded rounded-xl'
                                onClick={() => updateData(districtId, districtName, cityName)}
                            >
                                <p className='font-bold text-white text-lg'>Cập nhật</p>
                            </button>                
                        </div>
                    </div>
                </div>

            </div>
            <div className="m-5">
                <div className="block space-y-8">
                    <div className="space-y-4">
                        <label htmlFor="district-name-add" className="font-bold text-lg">Tên quận</label>
                        <br />
                        <input 
                            id="district-name-add" 
                            name="district-name-add" 
                            type="text"
                            className="w-full py-2 text-lg border border-black rounded-lg"
                            placeholder="   Tên quận..."
                            value={districtName}
                            onChange={(e) => setDistrictName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4">
                        <label htmlFor="city-name-add" className="font-bold text-lg">Tên thành phố</label>
                        <br />
                        {/* It must be a combobox -> selecting which city you need - fetch all city name from server for showing options */}
                        <select 
                            id="city-name-add" 
                            name="city-name-add"
                            className="px-5 py-3 rounded bg-stone-300"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        >   
                        {
                            cityData.map((item) => (
                                <>
                                    <option value={item}>{item}</option>  
                                </>                                
                            ))
                        }                        
                        </select>
                    </div>                    
                </div>                            
            </div>
        </div>
    );
};

export default StoreDistrictEditPage;