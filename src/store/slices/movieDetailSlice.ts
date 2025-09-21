import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MovieDetailState = {
  loading: boolean;
  movie: any | null;
  error: string | null;
};

const initialState: MovieDetailState = {
  loading: false,
  movie: null,
  error: null,
};

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    setDetailLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMovieDetail(state, action: PayloadAction<any | null>) {
      state.movie = action.payload;
      state.error = null;
    },
    setDetailError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearMovieDetail(state) {
      state.movie = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setDetailLoading,
  setMovieDetail,
  setDetailError,
  clearMovieDetail,
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
