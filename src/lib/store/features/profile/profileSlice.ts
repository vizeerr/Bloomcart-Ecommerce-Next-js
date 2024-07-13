import { createSlice } from '@reduxjs/toolkit'

export interface ProfileState {
  user: {
    email: string;
    name: string;
    isAdmin:boolean;
  };
}

const initialState: ProfileState = {

  user: {
    email: '',
    name: '',
    isAdmin:false
  }

};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
      delAuth(state) {
        state.user = {
          email:'',
          name:'',
          isAdmin:false
        };
      },
      setAuth(state, action) {                
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.user.isAdmin = action.payload.isAdmin;
      },
      
  },
})

// Action creators are generated for each case reducer function
export const { delAuth, setAuth } = profileSlice.actions

export default profileSlice.reducer

