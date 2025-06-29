// import { createSlice } from "@reduxjs/toolkit";
// // import { setToken } from "./authSlice";

// const initialState = {
//     user: null,
// }


// const profileSlice = createSlice({
//     name:"profile",
//     initialState: initialState,
//     reducers:{
//         setToken(state , value){
//             state.user = value.payload
//             localStorage.setItem("token" , value.payload);
//         },
//         clearToken(state){
//             state.token = null;
//             localStorage.removeItem("token");
//         },
//     },
// });

// export const {setUser} = profileSlice.actions;
// export default profileSlice.reducer; 

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  loading: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setUser, setLoading } = profileSlice.actions

export default profileSlice.reducer
