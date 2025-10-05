import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPages from "./pages/MyOrdersPages";
import AdminLayout from "./components/admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";
import EditProduct from "./components/admin/EditProduct";
import OrderManagement from "./components/admin/OrderManagement";
import ProtectedRoute from "./components/common/ProtectedRoute";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrdersPages />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />}></Route>
            <Route path="users" element={<UserManagement />}></Route>
            <Route path="products" element={<ProductManagement />}></Route>
            <Route path="products/:id/edit" element={<EditProduct />}></Route>
            <Route path="orders" element={<OrderManagement />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
