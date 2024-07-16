import { createSlice } from '@reduxjs/toolkit'

export interface AddressState {
  shippingAddress:{
    address:string,
    name:string,
    city:string,
    country:string,
    postalcode:number
  }
}

const initialState: AddressState = {
  shippingAddress:{
    address:"",
    name:"",
    city:"",
    country:"",
    postalcode:0
  }
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const {addShippingAddress} = addressSlice.actions

export default addressSlice.reducer
