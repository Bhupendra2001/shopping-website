import { loginFailure, loginStart, loginSuccess , logout} from "./userRedux";
import { publicRequest } from "../requestMethods";
import { deleteProducts , deleteSingleProduct} from "./cartRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./productRedux";
import axios from "axios";

export const login = async (dispatch, user, nevigate, setError) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://shopping-website-server.vercel.app/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    nevigate("/");
  } catch (err) {
    dispatch(loginFailure());
    setError(err.response.data)
  }
};

export const Logout = (dispatch)=>{
dispatch(logout())
dispatch(deleteProducts())
}



export const deleteProduct =  (dispatch , productId)=>{
  
 dispatch(deleteSingleProduct(productId))
}


export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await axios.post("https://shopping-website-server.vercel.app/api/products");

    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
