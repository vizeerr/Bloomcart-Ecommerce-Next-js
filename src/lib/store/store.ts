import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import profileReducer from './features/profile/profileSlice'

export const makeStore = ()=>{

  return configureStore({
    reducer: {
      cart : cartReducer,
      auth:profileReducer
    },
  })

}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']