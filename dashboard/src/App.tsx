/** @format */

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { store } from "@/store";

// Layout & Pages
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Products } from "@/pages/Products/Products";
import { CreateProduct } from "@/pages/Products/create";
import { UpdateProduct } from "@/pages/Products/update";
import { Orders } from "@/pages/Orders/Orders";
import { Customers } from "@/pages/Customers/Customers";
import { Payments } from "@/pages/Payments/Payments";
import Categories from "@/pages/Categories/Categories";
import Seller from "@/pages/Seller/Seller";
import OrderDetails from "@/pages/Orders/OrderDetails";
import CustomerDetails from "@/pages/Customers/CustomerDetails";
import PaymentDetails from "@/pages/Payments/PaymentDetails";
import SellerDetails from "@/pages/Seller/SellerDetails";

// Auth pages
import { Login } from "@/pages/AuthPage/login";
import { Register } from "@/pages/AuthPage/Registration";

// ProtectedRoute wrapper
import { ProtectedRoute } from "@/components/auth/ProtectedRouter";

function App() {
     return (
          <Provider store={store}>
               <ThemeProvider defaultTheme='light' storageKey='ui-theme'>
                    <BrowserRouter>
                         <Routes>
                              {/* Redirect root to dashboard */}
                              <Route
                                   path='/'
                                   element={
                                        <Navigate to='/dashboard' replace />
                                   }
                              />

                              {/* Public Auth Routes */}
                              <Route path='/login' element={<Login />} />
                              <Route
                                   path='/register'
                                   element={<Register />}
                              />

                              {/* Protected Routes */}
                              <Route
                                   element={
                                        <ProtectedRoute>
                                             <DashboardLayout />
                                        </ProtectedRoute>
                                   }>
                                   <Route
                                        path='/dashboard'
                                        element={<Dashboard />}
                                   />
                                   <Route path='/orders' element={<Orders />} />
                                   <Route
                                        path='/customers'
                                        element={<Customers />}
                                   />
                                   <Route
                                        path='/payments'
                                        element={<Payments />}
                                   />
                                   <Route
                                        path='/categories'
                                        element={<Categories />}
                                   />
                                   <Route path='/seller' element={<Seller />} />
                                   <Route
                                        path='/products'
                                        element={<Products />}
                                   />
                                   <Route
                                        path='/products/create'
                                        element={<CreateProduct />}
                                   />
                                   <Route
                                        path='/products/update/:id'
                                        element={<UpdateProduct />}
                                   />
                                   <Route
                                        path='/orders/:id'
                                        element={<OrderDetails />}
                                   />
                                   <Route
                                        path='/customers/:id'
                                        element={<CustomerDetails />}
                                   />
                                   <Route
                                        path='/payments/:id'
                                        element={<PaymentDetails />}
                                   />
                                   <Route
                                        path='/seller/:id'
                                        element={<SellerDetails />}
                                   />
                              </Route>
                         </Routes>
                    </BrowserRouter>
               </ThemeProvider>
          </Provider>
     );
}

export default App;
