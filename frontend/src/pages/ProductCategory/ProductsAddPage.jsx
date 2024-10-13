import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ReturnIcon from '../../images/icons/return-button.png';
import Header from "../../components/content/Header";

import { addProduct } from "../../assets/AdminProduct";
import { getAllCategoryName } from "../../assets/TypeOfProduct";
import { getAllStoreName } from "../../assets/StoreData";

const ProductAdminAddPage = () => { 
    // Variables here
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productAmount, setProductAmount] = useState(0);
    const [productUnitName, setProductUnitName] = useState('');

    const [catData, setCatData] = useState([]);
    const [catName, setCatName] = useState('');

    const [storeData, setStoreData] = useState([]);
    const [storeName, setStoreName] = useState('');

    const [image, setImage] = useState();
    const [imageData, setImageData] = useState();

    const nagivate = useNavigate();
    // Functions here
    useEffect(() => {
        const fetchAllData = async() => {
            const existedCatData = await getAllCategoryName();
            setCatName(existedCatData[0]);
            setCatData(existedCatData);
            
            const existedStoreData = await getAllStoreName();
            setStoreName(existedStoreData[0]);
            setStoreData(existedStoreData);
        };
        fetchAllData();
    }, []);

    const handleUploadImage = (e) => {
        setImageData(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const addData = async(tenmathang, dongia, soluongton, tendvt, tenloaimathang, tendaily, hinhanh) => {
        // Checking before adding
        let check_tenmathang = true;
        let check_tendvt = true;
        let check_hinhanh = true;

        if (tenmathang.length < 1) {
            alert("Tên mặt hàng không được rỗng");
            check_tenmathang = false;            
        }

        else if (tenmathang.length > 100) {
            alert("Tên mặt hàng quá dài")
            check_tenmathang = false;
        }

        if (tendvt.length < 1) {
            alert("Tên đơn vị tính không được rỗng");
            check_tendvt = false;
        }
        else if (tendvt.length > 50) {
            alert("Tên đơn vị tính quá dài");
            check_tendvt = false;
        }

        if (hinhanh === undefined) {
            alert("Chưa chọn hình ảnh");
            check_hinhanh = false;
        }

        if (check_tenmathang && check_tendvt && check_hinhanh) {
            let item = {
                "tenmathang": tenmathang,
                "dongia": dongia,
                "soluongton": soluongton,
                "tendvt": tendvt,
                "tenloaimathang": tenloaimathang,
                "tendaily": tendaily,
                "hinhanh": hinhanh
            }
            const data = await addProduct(item);
            console.log(data);
            if (data.message === "Thêm mặt hàng thành công") {
                alert("Thêm mặt hàng thành công");
                nagivate("/product-categorys");
            }
            else if (data.message === "Tên mặt hàng đã tồn tại") {
                alert("Tên mặt hàng đã tồn tại");                
            }
            else {
                alert("Thêm mặt hàng thất bại");
            }
        }
    };

    // Return here
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
                            to={"/product-categorys"}
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
                            <p className='text-xl font-bold italic'>{"Thêm mặt hàng"}</p>
                        </div>
                        <div className='w-1/2 flex justify-end mr-5'>
                            <button 
                                className='px-2 py-3 bg-red-500 rounded rounded-xl'
                                onClick={() => addData(productName, productPrice, productAmount, productUnitName, catName, storeName, imageData)}
                            >
                                <p className='font-bold text-white text-lg'>Thêm</p>
                            </button>                
                        </div>
                    </div>
                </div>

            </div>
            <div className="m-5">
                <div className="block space-y-8">
                    <div className="space-y-4">
                        <label htmlFor="product-name-add" className="font-bold text-lg">Tên mặt hàng</label>
                        <br />
                        <input 
                            id="product-name-add" 
                            name="product-name-add" 
                            type="text"
                            className="w-full py-2 text-lg border border-black rounded-lg"
                            placeholder="   Tên mặt hàng..."
                            values={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="product-price-add" className="font-bold text-lg">Đơn giá</label>
                        <br />
                        <input 
                            id="product-price-add" 
                            name="product-price-add" 
                            type="number"
                            className="w-full py-2 text-lg border border-black rounded-lg"
                            placeholder="   Đơn giá..."
                            values={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="product-amount-add" className="font-bold text-lg">Số lượng tồn</label>
                        <br />
                        <input 
                            id="product-amount-add" 
                            name="product-amount-add" 
                            type="number"
                            className="w-full py-2 text-lg border border-black rounded-lg"
                            placeholder="   Số lượng tồn..."
                            values={productAmount}
                            onChange={(e) => setProductAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="product-unit-name-add" className="font-bold text-lg">Tên đơn vị tính</label>
                        <br />
                        <input 
                            id="product-unit-name-add" 
                            name="product-unit-name-add" 
                            type="text"
                            className="w-full py-2 text-lg border border-black rounded-lg"
                            placeholder="   Tên đơn vị tính..."
                            values={productUnitName}
                            onChange={(e) => setProductUnitName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="cat-name-add" className="font-bold text-lg">Tên loại mặt hàng</label>
                        <br />
                        <select 
                            id="cat-name-add" 
                            name="cat-name-add"
                            type="text"
                            className="px-5 py-3 rounded bg-stone-300"
                            value={catName}
                            onChange={(e) => setCatName(e.target.value)}
                        >
                            {
                                catData.map((item) => (
                                    <option
                                        key = {item}
                                        value = {item}
                                    >
                                        {item}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="store-name-add" className="font-bold text-lg">Tên đại lý</label>
                        <br />
                        <select 
                            id="store-name-add" 
                            name="store-name-add"
                            type="text"
                            className="px-5 py-3 rounded bg-stone-300"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                        >
                            {
                                storeData.map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    
                    <div className="space-y-4">
                        <label htmlFor="product-image-add" className="font-bold text-lg">Hình mặt hàng</label>
                        <br />
                        <input 
                            id="product-image-add" 
                            name="product-image-add" 
                            type="file"
                            accept="image/*"
                            onChange={handleUploadImage}
                        />

                        <img 
                            src={image} 
                            alt="Hình ảnh mặt hàng"
                        />
                    </div>
                </div>                            
            </div>
        </div>
    )
};

export default ProductAdminAddPage;