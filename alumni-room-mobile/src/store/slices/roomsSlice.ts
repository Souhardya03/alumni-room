import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomsState {
  favorites: string[];
  searchFilters: {
    location: string;
    priceRange: [number, number];
    amenities: string[];
    occupancy: 'single' | 'double' | 'any';
  };
}

const initialState: RoomsState = {
  favorites: [],
  searchFilters: {
    location: '',
    priceRange: [0, 10000],
    amenities: [],
    occupancy: 'any',
  },
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const roomId = action.payload;
      const index = state.favorites.indexOf(roomId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(roomId);
      }
    },
    setSearchFilters: (state, action: PayloadAction<Partial<RoomsState['searchFilters']>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    clearSearchFilters: (state) => {
      state.searchFilters = initialState.searchFilters;
    },
  },
});

export const { toggleFavorite, setSearchFilters, clearSearchFilters } = roomsSlice.actions;
export default roomsSlice.reducer;