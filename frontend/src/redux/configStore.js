import { configureStore } from "@reduxjs/toolkit";
import video from "./videoReducer";
export const store = configureStore({
  reducer: {
    video,
  },
});
