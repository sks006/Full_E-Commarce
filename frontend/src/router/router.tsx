/** @format */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import CategoryPage from "../pages/CategoryPage";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import Wishlist from "../pages/Wishlist";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
     return (
          <Router>
               <Routes>
                    <Route path='/' element={<Index />} />
                    <Route path='/category/:category' element={<CategoryPage />} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/deals' element={<Shop />} />
                    <Route path='/special-prices' element={<Shop />} />
                    <Route path='/fresh' element={<CategoryPage />} />
                    <Route path='/frozen' element={<CategoryPage />} />
                    <Route path='*' element={<NotFound />} />
               </Routes>
          </Router> 
     );
};

export default AppRouter;
