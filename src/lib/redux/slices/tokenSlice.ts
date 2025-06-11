import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TokenState {
  token: string;
}

// Define the initial state using that type
const initialState: TokenState = {
  token: "",
};

export const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Export the actions
export const { setJwtToken } = TokenSlice.actions;

// Export the reducer
export default TokenSlice.reducer;
