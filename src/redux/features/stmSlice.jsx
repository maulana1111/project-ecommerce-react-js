import { createSlice } from "@reduxjs/toolkit";

const stmSlice = createSlice({
  name: "StoreData",
  initialState: {
    searchValue: "",
    users: {
      user_logged_in: false,
      user_id: "",
      user_name: "",
      token: "",
    },
  },
  reducers: {
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload.searchValue;
    },
    // updateUser: (state, action) => {
    //   // console.log(action)
    //   const { data, token } = action.payload;
    //   state.users.user_logged_in = true;
    //   state.users.user_id = data.id;
    //   state.users.user_name = data.name;
    //   state.users.token = token;
    // },
  },
});

export const { updateSearchValue } = stmSlice.actions;
export default stmSlice.reducer;
