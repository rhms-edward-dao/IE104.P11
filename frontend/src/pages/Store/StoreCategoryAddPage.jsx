import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import Header from "../../components/content/Header";
import ReturnIcon from '../../images/icons/return-button.png';

import { addStoreCategory } from "../../assets/StoreCategoryData";
function StoreAddPage() {
    // Variables here
    const [storeCateName, setStoreCateName] = useState('');
    const [maxDebt, setMaxDebt] = useState(0);
    const navigate = useNavigate();

    // Functions here
    const addData = async (tenloaidaily, sotiennotoida) => {
        // Variables here for condition to call addStoreApi
        let checkName = true;
        
        // Functions for checking string format tenloaidaily + sotiennotoida
        const isSpecicalLetter = (input) => /[!@#\$%\^\&*\)\(+=._-]/.test(input);

        // Check tenloaidaily: non-special-letter, length in [1, 100]        
        if (tenloaidaily.length < 1 || tenloaidaily.length > 100) {   
            alert("Độ dài tên loại đại lý không hợp lệ. Tên loại đại lý không được rỗng và không dài quá 100 ký tự");
            checkName = false;
        }
        else if(isSpecicalLetter(tenloaidaily)) {
            alert("Tên loại đại lý không được chứa các ký tự đặc biệt");
            checkName = false;
        }

        if (checkName === true) {
            const data = await addStoreCategory(tenloaidaily, sotiennotoida);
            if (data.message === "Thêm loại đại lý thất bại do loại đại lý đã tồn tại") {
                alert("Thêm loại đại lý thất bại do loại đại lý đã tồn tại");
            }
            else {
                alert("Thêm loại đại lý thành công");
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
                <div>
                    <div className='flex items-center gap-40'>
                        <NavLink
                            to={"/stores"}
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
                            <p className='text-xl font-bold italic'>{"Thêm loại đại lý"}</p>
                        </div>
                        <div className='w-1/2 flex justify-end mr-5'>
                            <button 
                                className='px-2 py-3 bg-red-500 rounded rounded-xl'
                                onClick={() => addData(storeCateName, maxDebt)}
                            >
                                <p className='font-bold text-white text-lg'>Thêm</p>
                            </button>                
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-5">
                <div className="block">
                    <label htmlFor="store-name-edit" className="font-bold text-lg">Tên loại đại lý</label>
                    <br />
                    <input 
                        id="store-name-edit" 
                        name="store-name-edit" 
                        type="text"
                        className="w-full py-2 text-lg border border-black rounded-lg"
                        placeholder="   Tên loại đại lý..."
                        value={storeCateName}
                        onChange={(e) => setStoreCateName(e.target.value)}
                    />
                </div>                                
                <div className="block py-5">
                    <label htmlFor="max-debt-edit" className="font-bold text-lg">Số tiền nợ tối đa</label>
                    <br />
                    <input 
                        id="max-debt-edit" 
                        name="max-debt-edit" 
                        type="number"
                        className="w-full py-2 text-lg border border-black rounded-lg"
                        placeholder="   Số tiền nợ tối đa..."
                        value={maxDebt}
                        onChange={(e) => setMaxDebt(e.target.value)}
                    />
                </div>                                
            </div>
        </div>
    );
};

export default StoreAddPage;