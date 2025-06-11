import { combineReducers } from "@reduxjs/toolkit";
import { TokenSlice } from "../slices/tokenSlice";
import { userSlice } from "../slices/userDetailSlice";
import {loadingSlice} from "../slices/loaderSlice"
// import {loaderSlice}

// Combine all reducers
export const reducers = combineReducers({
  token: TokenSlice.reducer,
  userDetails: userSlice.reducer, 
  loading: loadingSlice.reducer
});
