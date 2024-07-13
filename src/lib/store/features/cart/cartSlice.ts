import { createSlice } from '@reduxjs/toolkit'

export interface CartState {
  items: {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    brand: string,
    onSale: boolean,
    priceDrop: number,
    imageUrl: string,
    colors: string,
    reviews: number,
    inventory: number,
    quantity: number
  }[],
  total:number,
  totalItems:number,
  priceTotal:number
}

const initialState: CartState = {
  items: [],
  total:0,
  totalItems:0,
  priceTotal:0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index:number = state.items.findIndex(prod => prod._id === action.payload._id);
      if (index !== -1) {
        const stateQuantity = state.items[index].quantity
        const payloadQuantity = action.payload.quantity
        if(stateQuantity + payloadQuantity <= 0){
          state.items = state.items.filter(item=>item._id !==  action.payload._id)
        }else{
          state.items[index].quantity += action.payload.quantity;
        }
       
      } else {
        state.items.push(action.payload);
      }
      state.total = state.items.reduce((sum, item) => sum + item.priceDrop * item.quantity, 0);
      state.priceTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.totalItems = state.items.reduce((sum) => sum + 1, 0);
    },
    clearCart: (state) =>{
      state.items = [],
      state.total = 0,
      state.totalItems = 0,
      state.priceTotal = 0
    },
    removeFromCart:(state,action)=>{
      const index:number = state.items.findIndex(prod => prod._id === action.payload._id);
      if (index !== -1) {
          state.items = state.items.filter(item=>item._id !==  action.payload._id)       
          state.total = state.items.reduce((sum, item) => sum + item.priceDrop * item.quantity, 0);
          state.priceTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          state.totalItems = state.items.reduce((sum) => sum + 1, 0);

      } 
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart,clearCart,removeFromCart } = cartSlice.actions

export default cartSlice.reducer
