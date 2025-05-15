import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { store } from '@/store';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Products } from '@/pages/Products/Products';
import  {CreateProduct}  from '@/pages/Products/create';
import  EditProduct  from '@/pages/Products/update';
import { Orders } from '@/pages/Orders/Orders';
import { Customers } from '@/pages/Customers/Customers';
import { Payments } from '@/pages/Payments/Payments';
import Categories from '@/pages/Categories/Categories';
import Seller from '@/pages/Seller/Seller';
import OrderDetails from '@/pages/Orders/OrderDetails';
import CustomerDetails from '@/pages/Customers/CustomerDetails';
import PaymentDetails from '@/pages/Payments/PaymentDetails';
import SellerDetails from '@/pages/Seller/SellerDetails';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
             
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/seller" element={<Seller />} />

              
              <Route path="/products" element={<Products />} />
              <Route path="/products/create" element={<CreateProduct/>} />
              <Route path="/products/edit/:id" element={<EditProduct />} />

              
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/customers/:id" element={<CustomerDetails />} />
              <Route path="/payments/:id" element={<PaymentDetails />} />
           
              <Route path="/seller/:id" element={<SellerDetails />} />
              {/* Add more routes as needed */}

            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;