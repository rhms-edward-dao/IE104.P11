import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Card from '../../components/content/Card';
import Header from '../../components/content/Header';
import Button from '../../components/UI/Button';
import DWCardData from '../../assets/WarehouseCardData';
import PaginationButtons from '../../components/UI/PaginationButtons';
import TrashIcon from '../../images/icons/trash.png';
import EditIcon from '../../images/icons/edit.png';

import { getAllStoreCategory, deleteStoreCategory } from '../../assets/StoreCategoryData';
import { getAllStore, deleteStore } from '../../assets/StoreData';

import { useStoreTab } from '../../StoreTabState';
import { useModal } from '../../ModalState';

function Stores() {
    // Variables here
    const [categoryData, setCategoryData] = useState([]);
    const [storeData, setStoreData] = useState([]);

    // Variables for searching loaidaily
    const [catSearchTerm, setCatSearchTerm] = useState('');
    const [catResults, setCatResults] = useState([]);

    // Variables for searching daily
    const [stoSearchTerm, setStoSearchTerm] = useState('');
    const [stoResults, setStoResults] = useState([]);
    
    // Variables for store-tab here
    const {isStoreTab, activateStoreTab, deactivateStoreTab} = useStoreTab();
    const { 
        openModal,
        setLng,
        setLat
    } = useModal();

    // Variables for pagination - both store and store category
    const [currentPageStore, setCurrentPageStore] = useState(0);
    const [currentPageKind, setCurrentPageKind] = useState(0);
    const itemsPerPage = 5;

    // State to track the selected option and placeholder text
    const [selectedOption, setSelectedOption] = useState("Tên đại lý");
    const [selectedOptionCat, setSelectedOptionCat] = useState("Tên loại đại lý");

    // Function to handle the change of the dropdown and update placeholder
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleOptionChangeCat = (e) => {
        setSelectedOptionCat(e.target.value);
    };

    // Placeholder text based on the selected option
    const getPlaceholderText = () => {
        switch (selectedOption) {
        case "Tên đại lý":
            return "Tìm kiếm theo tên đại lý ...";
        case "Số điện thoại":
            return "Tìm kiếm theo số điện thoại ...";
        case "Tên loại đại lý":
            return "Tìm kiếm theo tên loại đại lý ...";
        default:
            return "Tìm kiếm ...";
        }
    };

    // Functions here
    useEffect(() => {
        const fetAllData = async() => {
            const catData = await getAllStoreCategory();
            setCategoryData(catData);

            const stoData = await getAllStore();        
            if (stoData.length === 0) {
                setStoreData([]);
            }
            else {
                setStoreData(stoData);                            
            }                        
        }        
        fetAllData();    
    }, []);
    // Function for loaidaily searching
    useEffect(() => {        
        if (catSearchTerm.trim() !== '') {
            const results = categoryData.filter((item) => {        
                if (selectedOptionCat === "Tên loại đại lý") {
                    return item.tenloaidaily.toLowerCase().includes(catSearchTerm.toLowerCase());
                }
                return false;
            });
                setCatResults(results);
            } else {
                setCatResults(categoryData);
            }

    }, [catSearchTerm, categoryData, selectedOptionCat]);

    // Function for daily searching
    useEffect(() => {        
        if (stoSearchTerm.trim() !== '') {
            const results = storeData.filter((item) => {        
                if (selectedOption === "Tên đại lý") {
                return item.Daily.tendaily.toLowerCase().includes(stoSearchTerm.toLowerCase());
                } else if (selectedOption === "Số điện thoại") {
                return item.Daily.sodienthoai.toLowerCase().includes(stoSearchTerm.toLowerCase());
                }
                return false;
            });
                setStoResults(results);
            } else {
                setStoResults(storeData);
            }
    }, [stoSearchTerm, storeData, selectedOption]);

    // Function for deleting loaidaily
    const deleteCatData = async(id) => {
        const data = await deleteStoreCategory(id);
        if (data.message === "Xóa loại đại lý thất bại") {
            alert("Xóa loại đại lý thất bại");
        }
        else {
            alert("Xóa loại đại lý thành công");
            setCategoryData(categoryData.filter(item => item.maloaidaily !== id));
        }
    };    
    // Function for handling modal 
    const handleOpenModal = (kinhdo, vido) => {
        setLng(kinhdo);
        setLat(vido);
        openModal();
    };

    // Function for deleteing daily
    const deleteStoreData = async(id) => {
        const data = await deleteStore(id);
        if (data.message === "Xóa đại lý thất bại") {
            alert("Xóa đại lý thất bại");
        }
        else {
            alert("Xóa đại lý thành công");
            setStoreData(storeData.filter(item => item.Daily.madaily !== id));
        }
    };

    // Items for render
    const catItems = catSearchTerm ? catResults : categoryData;
    const stoItems = stoSearchTerm ? stoResults : storeData;

    // Calculate offset - store
    const offsetStore = currentPageStore * itemsPerPage;
    const currentItemsStore = stoItems.length > 0 ? stoItems.slice(offsetStore, offsetStore + itemsPerPage) : [];
    const pageCountStore = stoItems.length > 0 ? Math.ceil(parseFloat(stoItems.length / itemsPerPage)) : 0;

    // Calculate offset - store category
    const offsetKind = currentPageKind * itemsPerPage;
    const currentItemsKind = catItems.length > 0 ? catItems.slice(offsetKind, offsetKind + itemsPerPage) : [];
    const pageCountKind = catItems.length > 0 ? Math.ceil(parseFloat(catItems.length / itemsPerPage)) : 0;

    // Return here
    return(
        <div>
            <div>
                <Header headerTitle="Danh sách Đại lý"></Header>
            </div>

            <div className="flex flex-wrap gap-5 xl:gap-16 2xl:gap-44 justify-center m-5">
                {DWCardData.map((card, index) => (
                <Card
                    key={index}
                    image={card.img}
                    description={card.description}
                    value={card.value}
                />
                ))}
            </div>
                                                            
            <div className="m-5 p-5 bg-white shadow-lg">
                {/* Tab for changing what to show */}                
                {isStoreTab? (
                    <div className="mt-6 mb-8 text-md font-bold text-center text-gray-500">
                        <ul className="flex flex-wrap -mb-px">
                            <li className="me-2">
                                <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-b border-blue-600">
                                    Đại lý
                                </button>
                            </li>
                            <li className="me-2">
                                <button 
                                    className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
                                    onClick={() => deactivateStoreTab()}
                                >
                                    Loại đại lý
                                </button>
                            </li>                    
                        </ul>
                    </div>
                ) : (
                    <div className="mt-6 mb-8 text-md font-bold text-center text-gray-500">
                        <ul className="flex flex-wrap -mb-px">
                            <li className="me-2">
                                <button 
                                    className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-800"
                                    onClick={() => activateStoreTab()}
                                >
                                    Đại lý
                                </button>
                            </li>
                            <li className="me-2">
                                <button className="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-b border-blue-600">
                                    Loại đại lý
                                </button>
                            </li>                    
                        </ul>
                    </div>
                )}            

                {/* Block for LOAIDAILY */}
                { isStoreTab? (
                    <>
                        {/* Block for DAILY */}
                        <div className="flex flex-wrap gap-3 justify-between">
                            <div className="flex flex-wrap gap-5 items-center justify-start">
                                <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
                                <select
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                    className="font-semibold text-lg py-3 px-3 rounded-md"
                                >
                                    <option value="Tên đại lý">Tên đại lý</option>
                                    <option value="Số điện thoại">Số điện thoại</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder={getPlaceholderText()}
                                    className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
                                    value={stoSearchTerm}
                                    onChange={(e) => setStoSearchTerm(e.target.value)}
                                />
                            </div>
                            <NavLink to="store-add-page">
                                <Button />
                            </NavLink>
                        </div>
                        <table className='w-full mt-5 text-center'>
                            <thead className='border-b-4 border-red-500'>
                                <tr className='text-md text-gray-500'>
                                    <th></th>
                                    <th scope='col' className='py-5 border-r-2'>Hình ảnh</th>
                                    <th scope='col' className='py-5 border-r-2'>Tên đại lý</th>
                                    <th scope='col' className='py-5 border-r-2'>Loại đại lý</th>
                                    <th scope='col' className='py-5 border-r-2'>Ngày tiếp nhận</th>
                                    <th scope='col' className='py-5 border-r-2'>Số điện thoại</th>
                                    <th scope='col' className='py-5 border-r-2'>Địa chỉ</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItemsStore.length >= 1 ? (
                                    <>
                                        { currentItemsStore.map((list, index) => (
                                            <tr key={index} className='border-b border-slate-300 hover:bg-slate-200 text-md'> 
                                                <td className='py-5 pl-3'>
                                                    <input 
                                                        type="checkbox" 
                                                    />
                                                </td>
                                                <td scope="row" className='py-5 border-r-2'>
                                                    <img 
                                                        width="250px"
                                                        src={`data:image/jpeg;base64, ${list.Daily.hinhanh}`} 
                                                        alt="Hình đại lý" 
                                                        className='rounded 2xl:w-20 2xl:h-20'
                                                    />
                                                </td>                            

                                                <td scope="row" className='py-5 border-r-2'>{list.Daily.tendaily}</td>
                                                <td scope="row" className='py-5 border-r-2'>{list.tenloaidaily}</td>
                                                <td scope="row" className='py-5 border-r-2'>{list.Daily.ngaytiepnhan}</td>
                                                <td scope="row" className='py-5 border-r-2'>{list.Daily.sodienthoai}</td>
                                                <td scope="row" className='py-5 border-r-2'>
                                                    <button onClick={() => handleOpenModal(list.kinhdo, list.vido)}>
                                                        <p className='line-clamp-1 hover:underline'>{list.diachi}</p>
                                                    </button>
                                                </td>
                                                <td scope="row">                                
                                                    <div className='flex flex-wrap justify-center gap-3'>
                                                        <NavLink 
                                                            to={`/stores/store-edit-page/${list.Daily.madaily}`}
                                                        >
                                                            <button>
                                                                <div className='flex gap-2 bg-green-500 p-2 rounded-md'>
                                                                    <img src={EditIcon} alt="Icon chỉnh sửa" />
                                                                    <p className='font-bold text-white hidden sm:hidden md:hidden lg:inline-block'>Chỉnh sửa</p>
                                                                </div>
                                                            </button>
                                                        </NavLink>
                                                        <button
                                                            onClick={() => deleteStoreData(list.Daily.madaily)}
                                                        >
                                                            <div className='flex gap-2 bg-amber-400 p-2 rounded-md'>
                                                                <img src={TrashIcon} alt="Icon thùng rác" />
                                                                <p className='font-bold text-white hidden sm:hidden md:hidden lg:inline-block'>Xóa</p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <></>
                                )} 
                            </tbody>
                        </table>
                        <PaginationButtons
                            pageCount={pageCountStore}
                            currentPage={currentPageStore}
                            setCurrentPage={setCurrentPageStore}
                        >
                        </PaginationButtons> 
                    </>
                ) : (
                    <>
                        {/* Bolck for LOAIDAILY */}
                        <div className="flex flex-wrap gap-3 justify-between">
                            <div className="flex flex-wrap gap-5 items-center justify-start">
                                <p className="font-bold whitespace-nowrap">Tìm kiếm theo:</p>
                                <select
                                    value={selectedOptionCat}
                                    onChange={handleOptionChangeCat}
                                    className="font-semibold text-lg py-3 px-3 rounded-md"
                                >
                                    <option value="Tên loại đại lý">Tên loại đại lý</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder={getPlaceholderText()}
                                    className="border border-black rounded-md py-0.5 px-2 text-lg w-24 lg:w-72 xl:w-96"
                                    value={catSearchTerm}
                                    onChange={(e) => setCatSearchTerm(e.target.value)}
                                />
                            </div>
                            <NavLink to="/stores/store-category-add-page">
                                <Button />
                            </NavLink>
                        </div>

                        <table className='w-full mt-5 text-center'>
                            <thead className='border-b-4 border-red-500'>
                                <tr className='text-md text-gray-500'>
                                    <th></th>
                                    <th scope='col' className='py-5 border-r-2'>Tên loại đại lý</th>
                                    <th scope='col' className='py-5 border-r-2'>Số tiền nợ tối đa</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                { currentItemsKind.length >= 1 ? (
                                    <>
                                        { currentItemsKind.map((list, index) => (
                                            <tr key={index} className='border-b border-slate-300 hover:bg-slate-200 text-md'> 
                                                <td className='py-5 pl-3'>
                                                    <input 
                                                        type="checkbox" 
                                                    />
                                                </td>
                                                <td scope="row" className='py-5 border-r-2'>{list.tenloaidaily}</td>
                                                <td scope="row" className='py-5 border-r-2'>{list.sotiennotoida}</td>                                   
                                                <td scope="row">                                
                                                    <div className='flex flex-wrap justify-center gap-3'>
                                                        <NavLink 
                                                            to={`/stores/store-category-edit-page/${list.maloaidaily}`}
                                                        >
                                                            <button>
                                                                <div className='flex gap-2 bg-green-500 p-2 rounded-md'>
                                                                    <img src={EditIcon} alt="Icon chỉnh sửa" />
                                                                    <p className='font-bold text-white hidden sm:block'>Chỉnh sửa</p>
                                                                </div>
                                                            </button>
                                                        </NavLink>
                                                        <button>
                                                            <div 
                                                                className='flex gap-2 bg-amber-400 p-2 rounded-md'
                                                                onClick={() => deleteCatData(list.maloaidaily)}
                                                            >
                                                                <img src={TrashIcon} alt="Icon thùng rác" />
                                                                <p className='font-bold text-white hidden sm:block'>Xóa</p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <></>
                                )
                                }                         
                            </tbody>
                        </table>    
                        <PaginationButtons
                            pageCount={pageCountKind}
                            currentPage={currentPageKind}
                            setCurrentPage={setCurrentPageKind}
                        >
                        </PaginationButtons>
                        {/* End block */}
                        
                        <hr className='mr-5 my-10' />
                    </>
                )}                                                
            </div>
        </div>
    );
};

export default Stores;