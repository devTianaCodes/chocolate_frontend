import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Offers from './pages/Offers.jsx';
import About from './pages/About.jsx';
import Faq from './pages/Faq.jsx';
import Gifts from './pages/Gifts.jsx';
import Search from './pages/Search.jsx';
import Favourites from './pages/Favourites.jsx';
import Shipping from './pages/Shipping.jsx';
import Returns from './pages/Returns.jsx';
import Privacy from './pages/Privacy.jsx';
import Contact from './pages/Contact.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Account from './pages/Account.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import AdminInventory from './pages/AdminInventory.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import RequireAuth from './components/routes/RequireAuth.jsx';
import RequireGuest from './components/routes/RequireGuest.jsx';
import RequireAdmin from './components/routes/RequireAdmin.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/offers', element: <Offers /> },
  { path: '/about', element: <About /> },
  { path: '/faq', element: <Faq /> },
  { path: '/shipping', element: <Shipping /> },
  { path: '/returns', element: <Returns /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/contact', element: <Contact /> },
  { path: '/gifts', element: <Gifts /> },
  { path: '/search', element: <Search /> },
  { path: '/favourites', element: <Favourites /> },
  { path: '/products/:slug', element: <ProductDetail /> },
  { path: '/cart', element: <Cart /> },
  {
    element: <RequireGuest />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Navigate to="/login?mode=register" replace /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      { path: '/checkout', element: <Checkout /> },
      { path: '/order-confirmation/:orderId', element: <OrderConfirmation /> },
      { path: '/account', element: <Account /> },
    ],
  },
  {
    element: <RequireAdmin />,
    children: [
      { path: '/admin/products', element: <AdminProducts /> },
      { path: '/admin/inventory', element: <AdminInventory /> },
      { path: '/admin/orders', element: <AdminOrders /> },
    ],
  },
]);

export default router;
