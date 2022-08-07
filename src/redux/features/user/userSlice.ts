import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export interface UserState {
  isLogged: boolean;
}

const initialState: UserState = {
  isLogged: cookies.get("refresh_token") ? true : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogged: (state: UserState, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogged } = userSlice.actions;

export default userSlice.reducer;
