import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplateState {
  template: string;
}

const initialState: TemplateState = {
  template: "",
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<string>) => {
      state.template = action.payload;
    },
    clearTemplate: (state) => {
      state.template = "";
    },
  },
});

export const { setTemplate, clearTemplate } = templateSlice.actions;
export default templateSlice.reducer;
