import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import Update from './pages/Update'
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import Order, { OrderThankYou } from './pages/Order';
import { Types } from './redux/Type';
import { getUser, refresh_token } from './apis/userAPIs';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import CreateProduct from './pages/CreateProduct';

function App() {
  const dispatch = useDispatch();

  const {isLogged, token, role} = useSelector(state => state.user);
  console.log('role', role)
  useEffect(() =>{
    const getRefreshToken = async() => {
      const response = await refresh_token();
      dispatch({type: Types.REFRESH_TOKEN, payload: response.data.accesstoken})
    }
    if(!isLogged){
        getRefreshToken();
        setTimeout(() => {
          getRefreshToken();
        }, 10 * 60 * 1000)
    }
  },[])

  useEffect(() => {
    if(token){
      try{
        const getUserData = async() => {
          const response = await getUser(token);
          dispatch({type: Types.GET_USER, payload: response.data})
        }
        getUserData();
      }catch(err){
        alert(err);
      }
    }
  
  }, [token])

  
  return (
    <Router>
      <Header />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/users/login" element={<Login />} />
        <Route  path="/users/register" element={<Register />} />
        <Route  path="/users/update" element={<Update />} />
        <Route path="/products/page" element={<Product />} />
        <Route path="/products/page/:id" element={<Product />} />
        <Route path="/products/view/:id" element={<ProductDetail />} />
        <Route path = "/carts/index" element={<Cart />} />
        <Route path = "/orders/index" element={<Order />} />
        <Route path = "/orders/thankyou" element={<OrderThankYou />} />
        <Route path='/orders/viewall' element={<OrderHistory />} />
        <Route path='/admin' element={role === 1 ? <Admin />: <NotFound />} />




      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


