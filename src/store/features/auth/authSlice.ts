import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  completedSteps: number;
}

const initialState: IAuthState = {
  completedSteps: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCompletedStepsCount: (state, action: PayloadAction<number>) => {
      state.completedSteps = action.payload;
    },
  },
});

export const { setCompletedStepsCount } = authSlice.actions;

// Selectors
export const selectCompletedStepsCount = (state: RootState) => state.auth.completedSteps;

export default authSlice.reducer;
