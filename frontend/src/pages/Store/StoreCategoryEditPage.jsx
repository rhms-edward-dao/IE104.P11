import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/content/Header";

import ReturnIcon from '../../images/icons/return-button.png';
import { getStoreCategoryById, updateStoreCategory } from "../../assets/StoreCategoryData";

function StoreCategoryEditPage() {
    // Variables here
    const [catName, setCatName] = useState('');
    const [maxDebt, setMaxDebt] = useState(0);
    const { catId } = useParams();
    const navigate = useNavigate();

    // Fetch default sotiennotoida from server
    useEffect(() => {
        const fetchDefaultMaxDebt = async(id) => {
            const data = await getStoreCategoryById(id);
            setCatName(data.tenloaidaily);
            setMaxDebt(data.sotiennotoida)
        };
        fetchDefaultMaxDebt(catId);
    }, []);

    // Function for udpating here
    const updateData = async(id, tenloaidaily, sotiennotoida) => {
        const data = await updateStoreCategory(id, tenloaidaily, sotiennotoida);
        if (data.message === "loại đại lý không tồn tại") {
            alert("Cập nhật loại đại lý thất bại. Loại đại lý không tồn tại");
        }
        else {
            alert("Cập nhật loại đại lý thành công");
            navigate("/stores");
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
                        <p className='text-xl font-bold italic'>{"Cập nhật loại đại lý"}</p>
                    </div>
                    <div className='w-1/2 flex justify-end mr-5'>
                        <button 
                            className='px-2 py-3 bg-red-500 rounded rounded-xl'
                            onClick={() => updateData(catId, catName, maxDebt)}
                        >
                            <p className='font-bold text-white text-lg'>Cập nhật</p>
                        </button>                
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
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                    />
                </div>
                <div className="block py-5">
                    <label htmlFor="max-dext-edit" className="font-bold text-lg">Số tiền nợ tối đa</label>
                    <br />
                    <input 
                        id="max-debt-edit" 
                        name="max-debt-edit" 
                        type="number"
                        className="w-full py-2 text-lg border border-black rounded-lg"
                        value={maxDebt}
                        onChange={(e) => setMaxDebt(e.target.value)}
                    />
                </div>                
            </div>
        </div>
    );
};

export default StoreCategoryEditPage;