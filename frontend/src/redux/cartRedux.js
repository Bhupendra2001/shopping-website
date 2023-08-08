import { createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        products : [],
        quantity : 0,
        total : 0
    },

    reducers : {
        addProduct : ( state , action)=>{
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        deleteProducts : (state)=>{
        state.quantity = 0;
        state.total = 0;
        state.products = []
        },

        deleteSingleProduct : (state , action)=>{

            const deletedProduct = action.payload;
            const updatedProducts = state.products.filter(product => product._id !== deletedProduct._id);
      
            state.products = updatedProducts;
            state.quantity -= deletedProduct.quantity;
            state.total -= deletedProduct.price * deletedProduct.quantity;
        }
    }
})

export const { addProduct, deleteProducts , deleteSingleProduct} = cartSlice.actions
export default cartSlice.reducer;