import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Product/Products";
import ProductsAddPage from "./pages/Product/ProductsAddPage";
import ProductsEditPage from "./pages/Product/ProductsEditPage";

import Warehouses from "./pages/Warehouse/Warehouses";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="w-screen">
          <div className="absolute right-0 w-4/6 h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<Products />} />

              {/* Routes for product */}
              <Route path="/products" element={<Products />} />
              <Route
                path="/products/products-edit-page"
                element={<ProductsEditPage />}
              />
              <Route
                path="/products/products-add-page"
                element={<ProductsAddPage />}
              />

              {/* Routes for warehouse */}
              <Route path="/warehouses" element={<Warehouses />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
