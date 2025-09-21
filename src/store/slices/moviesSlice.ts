import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  upcoming: [],    
  genres: [],       
  searchQuery: '',  
  searchResults: [],
  loading: false,
  error: null,
};


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUpcoming(state, action) {
      state.upcoming = action.payload || [];
    },
    setGenres(state, action) {
      state.genres = action.payload || [];
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload || '';
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload || [];
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearSearch(state) {
      state.searchQuery = '';
      state.searchResults = [];
    },
  },
});

export const {
  setLoading,
  setUpcoming,
  setGenres,
  setSearchQuery,
  setSearchResults,
  setError,
  clearSearch,
} = moviesSlice.actions;

export default moviesSlice.reducer;
