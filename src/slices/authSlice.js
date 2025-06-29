// import { createSlice } from "@reduxjs/toolkit";

// //initial states

// // const getInitialToken = () => {
// //   try {
// //     return localStorage.getItem("token") || null;
// //   } catch (error) {
// //     console.error("Error accessing localStorage:", error);
// //     return null;
// //   }
// // };


// // console.log(getInitialToken);


// const initialState = {
//     signupData: null,
//     // token: getInitialToken(),
//     token : localStorage.getItem("token") || null,
    
  
//     loading: false,
//     // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  

//     // localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
// }

// const authSlice = createSlice({
//     name:"auth",
//     initialState: initialState,
//     reducers: {
//         setToken(state, value){
//             state.token = value.payload;
//              localStorage.setItem("token", value.payload);
//         },
//         setSignupData(state, value){
//             state.signupData = value.payload;
//         },
//         setLoading(state, value) {
//             state.loading = value.payload;
//         },
//     //     clearToken(state) {
//     //         state.token = null;
//     //         localStorage.removeItem("token");
//     // },
//     },
// });

// export const { setSignupData ,setToken , setLoading} = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
