import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  takingQuiz: false,
  isTakingQuizModal: false,
};

const videoReducer = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateTakingQuiz: function (state, actions) {
      console.log("actions: ", actions.payload);
      state.takingQuiz = actions.payload;
    },
    updateIsTakingQuizModal: function (state, actions) {
      console.log("actions: ", actions.payload);
      state.isTakingQuizModal = actions.payload;
    },
  },
});

export const videoState = (state) => state.video;
export const { updateTakingQuiz, updateIsTakingQuizModal } =
  videoReducer.actions;

export default videoReducer.reducer;
