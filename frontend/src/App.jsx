import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { ProductList } from "./pages/ProductList";
import { Product } from "./pages/Product";
import {  Routes, Route  } from "react-router-dom";
import { ChangePassword } from "./pages/ChangePassword";
import { ResetPassword } from "./pages/ResetPassword";



function App() {

 

  

  
  return (
    
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/products/:category" element={<ProductList />} />

        <Route path="/product/:id" element={<Product />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login/>} /> 

        <Route path="/register" element={<Register />} />

        <Route path="/change" element={<ChangePassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword/>} />

       
        
      </Routes>
    
  );
}

export default App;
