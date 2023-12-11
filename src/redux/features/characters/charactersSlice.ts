import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '@/components/CharacterCard/CharacterCard';
import { loadCharacters } from '@/redux/thunks/loadCharacters';

type InitialState = {
  characters: Character[],
  totalCount: number,
}

const initialState = {
  characters: [],
  totalCount: 0,
} as InitialState;

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialState,
  reducers: {
    addCharacters: (state, action: PayloadAction<Character[]>) => {
      const characters = action.payload;

      state.characters = characters;
      // state.totalCount = characters.length;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCharacters.fulfilled, (state, action) => {
      console.log(action.payload);
      const { characters } = action.payload;

      state.characters = characters.results;
      state.totalCount = characters.info.count || 0;
    })
  },
});

export const { addCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
