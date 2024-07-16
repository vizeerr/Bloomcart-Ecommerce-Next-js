import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import profileReducer from './features/profile/profileSlice'
import addressReducer from "./features/address/addressSlice"
import checkoutReducer from "./features/checkout/checkoutSlice"
export const makeStore = ()=>{

  return configureStore({
    reducer: {
      cart : cartReducer,
      auth:profileReducer,
      address:addressReducer,
      checkout:checkoutReducer,
    },
  })

}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']