import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Feedstock = lazy(() => import("./pages/Feedstock"));

const Product = lazy(() => import("./pages/Product"));

const ProductFeedstock = lazy(() => import("./pages/ProductFeedstock"));

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/product" element={<Product />} />
                <Route path="/feedstock" element={<Feedstock />} />
                <Route path="/productFeedstock" element={<ProductFeedstock />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
