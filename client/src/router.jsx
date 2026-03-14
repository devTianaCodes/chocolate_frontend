import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import AdminInventory from './pages/AdminInventory.jsx';
import AdminOrders from './pages/AdminOrders.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/products/:slug', element: <ProductDetail /> },
  { path: '/cart', element: <Cart /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/order-confirmation/:orderId', element: <OrderConfirmation /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/account', element: <Account /> },
  { path: '/admin/products', element: <AdminProducts /> },
  { path: '/admin/inventory', element: <AdminInventory /> },
  { path: '/admin/orders', element: <AdminOrders /> },
]);

export default router;
