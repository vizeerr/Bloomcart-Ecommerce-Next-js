import { createSlice } from '@reduxjs/toolkit'

export interface CheckoutState {
  checkout:{
    id:string
  }
}

const initialState: CheckoutState = {
  checkout:{
    id:""
  }
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    processCheckout: (state, action) => {
      state.checkout.id = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const {processCheckout} = checkoutSlice.actions

export default checkoutSlice.reducer
