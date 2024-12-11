import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Contexts Here
import { ActiveButtonProvider } from "./contexts/ActiveButton";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { StoreTabProvider } from "./contexts/StoreTabState";
import { ModalProvider } from "./contexts/ModalState";
import { PopupProvider } from "./contexts/DetailPopup";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Import Components Here
import Sidebar from "./components/Sidebar";
import MapModal from "./components/UI/MapModal";
import StaffDetail from "./components/UI/StaffDetail";

// Import Pages Here
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";

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

import Products from "./pages/Product/Products";
import ProductStaffAddPage from "./pages/Product/ProductAddPage";
import ProductStaffEditPage from "./pages/Product/ProductEditPage";
import ProductCategoriesAddPage from "./pages/Product/ProductCategoriesAddPage";
import ProductCategoriesEditPage from "./pages/Product/ProductCategoriesEditPage";

import Staff from "./pages/Staff/Staff";
import StaffManagementAddPage from "./pages/Staff/StaffAddPage";
import StaffManagementEditPage from "./pages/Staff/StaffEditPage";
import PositionAddPage from "./pages/Staff/PositionAddPage";
import PositionEditPage from "./pages/Staff/PositionEditPage";

import Rule from "./pages/Rule/Rule";

import StoreMaintainance from "./pages/Maintainance/StoreMaintainance";

import AdminReport from "./pages/AdminReport/AdminReport";
import ProfitReport from "./pages/AdminReport/ProfitReport";
import StockReport from "./pages/AdminReport/StockReport";
// import RevenueReport from "./pages/AdminReport/RevenueReport";

import StaffReport from "./pages/Report/StaffReport";

import Customer from "./pages/Customer/Customer";
import CustomerAddPage from "./pages/Customer/CustomerAddPage";
import CustomerEditPage from "./pages/Customer/CustomerEditPage";

// import Management from "./pages/Management";

import MyAccount from "./pages/MyAccount/MyAccount";
import MyAccountEditPage from "./pages/MyAccount/MyAccountEditPage";

import Warehouse from "./pages/Warehouse/Warehouse";
import ImportAddPage from "./pages/Warehouse/ImportAddPage";
import ImportEditPage from "./pages/Warehouse/ImportEditPage";
import WarehouseImportPage from "./pages/Warehouse/WarehouseImportPage";
import ExportAddPage from "./pages/Warehouse/ExportAddPage";
import ExportEditPage from "./pages/Warehouse/ExportEditPage";
import WarehouseExportPage from "./pages/Warehouse/WarehouseExportPage";

import StoreManagement from "./pages/StoreManagement/StoreManagement";
import StoreManagementEditPage from "./pages/StoreManagement/StoreManagementEditPage";

// Component bảo vệ route
function ProtectedRoute({ element }) {
  const { userInfo } = useAuth();
  if (userInfo.isAdmin !== undefined) {
    // Just return route after successfully logged
    return element;
  } else {
    return null;
  }
}

function App() {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <LanguageProvider>
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
                            {/* Login, SignUp dont need to be protected */}
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route
                              path="/forget-password"
                              element={<ForgetPassword />}
                            />
                            {/* Routes for My Account */}
                            <Route
                              path="/my-account"
                              element={
                                <ProtectedRoute element={<MyAccount />} />
                              }
                            />
                            <Route
                              path="/my-account/my-account-edit-page"
                              element={
                                <ProtectedRoute
                                  element={<MyAccountEditPage />}
                                />
                              }
                            />

                            {/* Routes for district */}
                            <Route
                              path="/districts"
                              element={
                                <ProtectedRoute element={<Districts />} />
                              }
                            />
                            <Route
                              path="/districts/district-add-page"
                              element={
                                <ProtectedRoute
                                  element={<StoreDistrictAddPage />}
                                />
                              }
                            />
                            <Route
                              path="/districts/district-edit-page/:districtId"
                              element={
                                <ProtectedRoute
                                  element={<StoreDistrictEditPage />}
                                />
                              }
                            />

                            {/* Routes for store */}
                            <Route
                              path="/stores"
                              element={<ProtectedRoute element={<Stores />} />}
                            />
                            <Route
                              path="/stores/store-add-page"
                              element={
                                <ProtectedRoute element={<StoreAddPage />} />
                              }
                            />
                            <Route
                              path="/stores/store-edit-page/:storeId"
                              element={
                                <ProtectedRoute element={<StoreEditPage />} />
                              }
                            />
                            <Route
                              path="/stores/store-category-add-page"
                              element={
                                <ProtectedRoute
                                  element={<StoreCategoryAddPage />}
                                />
                              }
                            />
                            <Route
                              path="/stores/store-category-edit-page/:storeCategoryId"
                              element={
                                <ProtectedRoute
                                  element={<StoreCategoryEditPage />}
                                />
                              }
                            />

                            {/* Routes for product category - for admin only */}
                            <Route
                              path="/product-categorys"
                              element={
                                <ProtectedRoute
                                  element={<ProductCategorys />}
                                />
                              }
                            />
                            <Route
                              path="/product-categorys/product-categorys-add-page"
                              element={
                                <ProtectedRoute
                                  element={<ProductCategorysAddPage />}
                                />
                              }
                            />
                            <Route
                              path="/product-categorys/product-categorys-edit-page/:productCategoryId"
                              element={
                                <ProtectedRoute
                                  element={<ProductCategorysEditPage />}
                                />
                              }
                            />
                            {/* <Route path="/product-categorys/product-add-page" element={<ProtectedRoute element={<ProductAdminAddPage />} />} /> */}
                            <Route
                              path="/product-categorys/product-edit-page/:productId"
                              element={
                                <ProtectedRoute
                                  element={<ProductAdminEditPage />}
                                />
                              }
                            />

                            {/* Routes for product - for staff only*/}
                            <Route
                              path="/products"
                              element={
                                <ProtectedRoute element={<Products />} />
                              }
                            />
                            <Route
                              path="/products/product-add-page"
                              element={
                                <ProtectedRoute
                                  element={<ProductStaffAddPage />}
                                />
                              }
                            />
                            <Route
                              path="/products/product-edit-page/:productId"
                              element={
                                <ProtectedRoute
                                  element={<ProductStaffEditPage />}
                                />
                              }
                            />
                            <Route
                              path="/products/product-categorys-add-page"
                              element={
                                <ProtectedRoute
                                  element={<ProductCategoriesAddPage />}
                                />
                              }
                            />
                            <Route
                              path="/products/product-categorys-edit-page/:productCategoryId"
                              element={
                                <ProtectedRoute
                                  element={<ProductCategoriesEditPage />}
                                />
                              }
                            />

                            {/* Routes for staff */}
                            <Route
                              path="/staff-management"
                              element={<ProtectedRoute element={<Staff />} />}
                            />
                            <Route
                              path="/staff-management/staff-management-edit-page/:staffId"
                              element={
                                <ProtectedRoute
                                  element={<StaffManagementEditPage />}
                                />
                              }
                            />
                            <Route
                              path="/staff-management/staff-management-add-page"
                              element={
                                <ProtectedRoute
                                  element={<StaffManagementAddPage />}
                                />
                              }
                            />
                            <Route
                              path="/staff-management/position-add-page"
                              element={
                                <ProtectedRoute element={<PositionAddPage />} />
                              }
                            />
                            <Route
                              path="/staff-management/position-edit-page/:positionId"
                              element={
                                <ProtectedRoute
                                  element={<PositionEditPage />}
                                />
                              }
                            />

                            {/* Routes for rules */}
                            <Route
                              path="/rule-management"
                              element={<ProtectedRoute element={<Rule />} />}
                            />

                            {/* Route for store maintainance*/}
                            <Route
                              path="/store-maintainance/:storeId"
                              element={
                                <ProtectedRoute
                                  element={<StoreMaintainance />}
                                />
                              }
                            />

                            {/* Routes for Report - only for Admin */}
                            <Route
                              path="/admin-report"
                              element={
                                <ProtectedRoute element={<AdminReport />} />
                              }
                            />
                            <Route
                              path="/profit-report"
                              element={
                                <ProtectedRoute element={<ProfitReport />} />
                              }
                            />
                            <Route
                              path="/stock-report"
                              element={
                                <ProtectedRoute element={<StockReport />} />
                              }
                            />
                            {/*
                            <Route
                              path="/revenue-report"
                              element={
                                <ProtectedRoute element={<RevenueReport />} />
                              }
                            />
                            */}
                            {/* Routes for Report - only for Staff */}
                            <Route
                              path="/staff-report"
                              element={
                                <ProtectedRoute element={<StaffReport />} />
                              }
                            />

                            {/* Routes for Customer*/}
                            <Route
                              path="/customer"
                              element={
                                <ProtectedRoute element={<Customer />} />
                              }
                            />
                            <Route
                              path="/customer/customer-add-page"
                              element={
                                <ProtectedRoute element={<CustomerAddPage />} />
                              }
                            />
                            <Route
                              path="/customer/customer-edit-page/:customerId"
                              element={
                                <ProtectedRoute
                                  element={<CustomerEditPage />}
                                />
                              }
                            />

                            {/* Routes for Warehouse - Only for Normal Staff */}
                            <Route
                              path="/warehouse"
                              element={
                                <ProtectedRoute element={<Warehouse />} />
                              }
                            />
                            <Route
                              path="/warehouse/warehouse-import-add-page"
                              element={
                                <ProtectedRoute element={<ImportAddPage />} />
                              }
                            />
                            <Route
                              path="/warehouse/warehouse-import-edit-page/:importId"
                              element={
                                <ProtectedRoute element={<ImportEditPage />} />
                              }
                            />
                            <Route
                              path="/warehouse/warehouse-import-detail-page/:importId"
                              element={
                                <ProtectedRoute
                                  element={<WarehouseImportPage />}
                                />
                              }
                            />
                            <Route
                              path="/warehouse/warehouse-export-add-page"
                              element={
                                <ProtectedRoute element={<ExportAddPage />} />
                              }
                            />
                            <Route
                              path="/warehouse/warehouse-export-edit-page/:exportId"
                              element={
                                <ProtectedRoute element={<ExportEditPage />} />
                              }
                            />
                            <Route
                              path="/warehouse/warehouse-export-detail-page/:exportId"
                              element={
                                <ProtectedRoute
                                  element={<WarehouseExportPage />}
                                />
                              }
                            />

                            {/* Routes for Store Management - Only for Normal Staff*/}
                            <Route
                              path="/store-management"
                              element={
                                <ProtectedRoute element={<StoreManagement />} />
                              }
                            />
                            <Route
                              path="/store-management/store-management-edit-page"
                              element={
                                <ProtectedRoute
                                  element={<StoreManagementEditPage />}
                                />
                              }
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
            </LanguageProvider>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
