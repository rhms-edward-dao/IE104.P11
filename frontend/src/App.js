import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Contexts Here
import { ActiveButtonProvider } from "./contexts/ActiveButton";
import { AuthProvider } from "./contexts/AuthContext";
import { StoreTabProvider } from "./contexts/StoreTabState";
import { ModalProvider } from "./contexts/ModalState";
import { PopupProvider } from "./contexts/StaffDetailState";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Import Components Here
import Sidebar from "./components/Sidebar";
import MapModal from "./components/UI/MapModal";
import StaffDetail from "./components/UI/StaffDetail";

// Import Pages Here
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Districts from "./pages/StoreDistrict/StoreDistrict";
import StoreDistrictAddPage from "./pages/StoreDistrict/StoreDistrictAddPage";
import StoreDistrictEditPage from "./pages/StoreDistrict/StoreDistrictEditPage";

import Stores from "./pages/Store/Store";
import StoreAddPage from "./pages/Store/StoreAddPage";
import StoreEditPage from "./pages/Store/StoreEditPage";
import StoreCategoryAddPage from "./pages/Store/StoreCategoryAddPage";
import StoreCategoryEditPage from "./pages/Store/StoreCategoryEditPage";

import ProductCategorys from "./pages/ProductCategory/ProductCategory";
import ProductCategorysAddPage from "./pages/ProductCategory/ProductCategoryAddPage";
import ProductCategorysEditPage from "./pages/ProductCategory/ProductCategoryEditPage";
import ProductAdminAddPage from "./pages/ProductCategory/ProductsAddPage";
import ProductAdminEditPage from "./pages/ProductCategory/ProductsEditPage";

// import Products from "./pages/Products";
// import ProductsEditPage from "./pages/ProductsEditPage";
// import ProductsAddPage from "./pages/ProductsAddPage";

import Staff from "./pages/Staff/Staff";
import StaffManagementAddPage from "./pages/Staff/StaffAddPage";
import StaffManagementEditPage from "./pages/Staff/StaffEditPage";
import PositionAddPage from "./pages/Staff/PositionAddPage";
import PositionEditPage from "./pages/Staff/PositionEditPage";

import Rule from "./pages/Rule/Rule";
// import RuleAddPage from "./pages/Rule/RuleAddPage";
// import RuleEditPage from "./pages/Rule/RuleEditPage";

// import AdminReport from "./pages/AdminReport/AdminReport";

import Customer from "./pages/Customer/Customer";
import CustomerAddPage from "./pages/Customer/CustomerAddPage";
import CustomerEditPage from "./pages/Customer/CustomerEditPage";

// import Management from "./pages/Management";

import MyAccount from "./pages/MyAccount/MyAccount";
import MyAccountEditPage from "./pages/MyAccount/MyAccountEditPage";

import Warehouse from "./pages/Warehouse/Warehouse";
import WarehouseImportPage from "./pages/Warehouse/WarehouseImportPage";
import WarehouseExportPage from "./pages/Warehouse/WarehouseExportPage";

import StoreManagement from "./pages/StoreManagement/StoreManagement";

import StaffReport from "./pages/Report/StaffReport";

function App() {
  return (
    <div>
      <ThemeProvider>
        <BrowserRouter>
          <LanguageProvider>
            <AuthProvider>
              <ActiveButtonProvider>
                <StoreTabProvider>
                  <PopupProvider>
                    <ModalProvider>
                      <div className="flex h-full w-full bg-gray-200 transition-colors duration-300 dark:bg-[#0d1117]">
                        <div className="left-0 w-3/12 md:w-1/6">
                          <Sidebar></Sidebar>
                        </div>
                        <div className="right-0 w-9/12 md:w-5/6">
                          <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            {/* Routes for My Account */}
                            <Route path="/my-account" element={<MyAccount />} />
                            <Route
                              path="/my-account/my-account-edit-page"
                              element={<MyAccountEditPage />}
                            />

                            {/* Routes for district */}
                            <Route
                              path="/districts"
                              element={<Districts />}
                            ></Route>
                            <Route
                              path="/districts/district-add-page"
                              element={<StoreDistrictAddPage />}
                            ></Route>
                            <Route
                              path="/districts/district-edit-page/:districtId"
                              element={<StoreDistrictEditPage />}
                            ></Route>

                            {/* Routes for store */}
                            <Route path="/stores" element={<Stores />} />
                            <Route
                              path="/stores/store-add-page"
                              element={<StoreAddPage />}
                            />
                            <Route
                              path="/stores/store-edit-page/:storeId"
                              element={<StoreEditPage />}
                            />
                            <Route
                              path="/stores/store-category-add-page"
                              element={<StoreCategoryAddPage />}
                            />
                            <Route
                              path="/stores/store-category-edit-page/:storeCategoryId"
                              element={<StoreCategoryEditPage />}
                            />

                            {/* Routes for product category - for admin only */}
                            <Route
                              path="/product-categorys"
                              element={<ProductCategorys />}
                            ></Route>
                            <Route
                              path="/product-categorys/product-categorys-add-page"
                              element={<ProductCategorysAddPage />}
                            ></Route>
                            <Route
                              path="/product-categorys/product-categorys-edit-page/:productCategoryId"
                              element={<ProductCategorysEditPage />}
                            ></Route>
                            <Route
                              path="/product-categorys/product-add-page"
                              element={<ProductAdminAddPage />}
                            ></Route>
                            <Route
                              path="/product-categorys/product-edit-page/:productId"
                              element={<ProductAdminEditPage />}
                            ></Route>

                            {/* Routes for product */}
                            {/* <Route path="/products" element={<Products />} />
                        <Route
                          path="/products/products-edit-page"
                          element={<ProductsEditPage />}
                        />
                        <Route
                          path="/products/products-add-page"
                          element={<ProductsAddPage />}
                        /> */}

                            {/* Routes for staff */}
                            <Route
                              path="/staff-management"
                              element={<Staff />}
                            ></Route>
                            <Route
                              path="/staff-management/staff-management-edit-page/:staffId"
                              element={<StaffManagementEditPage />}
                            ></Route>
                            <Route
                              path="/staff-management/staff-management-add-page"
                              element={<StaffManagementAddPage />}
                            ></Route>
                            <Route
                              path="/staff-management/position-add-page"
                              element={<PositionAddPage />}
                            ></Route>
                            <Route
                              path="/staff-management/position-edit-page/:positionId"
                              element={<PositionEditPage />}
                            ></Route>

                            {/* Routes for rules */}
                            <Route
                              path="/rule-management"
                              element={<Rule />}
                            ></Route>

                            {/* Routes for Report */}
                            {/* <Route
                          path="/admin-report"
                          element={<AdminReport />}
                        ></Route>*/}
                            <Route
                              path="/staff-report"
                              element={<StaffReport />}
                            />

                            {/* Routes for Customer */}
                            <Route
                              path="/customer"
                              element={<Customer />}
                            ></Route>
                            <Route
                              path="/customer/customer-add-page"
                              element={<CustomerAddPage />}
                            ></Route>
                            <Route
                              path="/customer/customer-edit-page/:customerId"
                              element={<CustomerEditPage />}
                            ></Route>

                            {/* <Route path="/management" element={<Management />} /> */}

                            {/* Routes for Warehouse */}
                            <Route path="/warehouse" element={<Warehouse />} />
                            <Route
                              path="/warehouse/warehoue-import-page"
                              element={<WarehouseImportPage />}
                            />
                            <Route
                              path="/warehouse/warehouse-export-page"
                              element={<WarehouseExportPage />}
                            />

                            {/* Routes for Store Management */}
                            <Route
                              path="/store-management"
                              element={<StoreManagement />}
                            />
                          </Routes>
                        </div>
                      </div>
                      <MapModal></MapModal>
                      <StaffDetail></StaffDetail>
                    </ModalProvider>
                  </PopupProvider>
                </StoreTabProvider>
              </ActiveButtonProvider>
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
