
/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define type for the user details
interface UserDetail {
  id: string;
  email: string;
  is2Fa: boolean;
  isCompleted: number;
  kycRetryCount: number;
  kycStatus: string;
  phoneNumber: string;
  profileImage: string | null;
  status: string;
  userDetail: {
    firstName: string;
    lastName: string;
    dob: string | null;
    gender: string | null;
    state: string | null;
  };
}

// Define  type for the slice state
interface UserState {
  userDetail: UserDetail | null;
}

// Define the initial state using that type
const initialState: UserState = {
  userDetail: null,
};

export const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<UserDetail>) => {
      state.userDetail = action.payload;
    },
  },
});

// Export the actions
export const { setUserDetail } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
