import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character } from '../../components/Card/Card';
import request, { gql } from 'graphql-request';

const initialState: Character[] = [];

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    add: (characters, action: PayloadAction<Character[]>) => {
      characters.concat(action.payload);
    },
    // find: (characters, action: PayloadAction<number>) => {
    //   characters.find(char => char.id === action.payload);
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(loadCharacters.fulfilled, (state, action) => {
      return state.concat(action.payload.characters.results)
    })
  },
});

export const {
  add,
  // find,
} = charactersSlice.actions;

export default charactersSlice.reducer;

type FilterCharacter = {
  name: string
  status: string
  species: string
  type: string
  gender: string
}

type queryArgument = {
  page?: number
  filter?: FilterCharacter
}

type ReturnCharacters = {
  characters: {
    results: Character[],
  }
}

// type ReturnCharacterById = {
//   character: Character
// }

const loadItems = ({ page, filter }: queryArgument): Promise<ReturnCharacters> => {
  return request('https://rickandmortyapi.com/graphql', gql`
    query getCharacters($page: Int = 1, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info {
          count
          next
          prev
        }
        results {
          id
          name
          status
          species
          image
          location {
            id
            name
          }
          episode {
            id
            name
          }
        }
      }
    }
  `,
    {
    page,
    filter,
  })
}

// const loadChar = (id: number): Promise<ReturnCharacterById> => {
//   return request('https://rickandmortyapi.com/graphql', gql`
//   query getCharById($id: Int = 1) {
//     character(id: $id) {
//       name
//       status
//       species
//       image
//       location {
//         id
//         name
//       }
//       episode {
//         id
//         name
//       }
//     }
//   }
//   `,
//     {
//     id,
//   })
// }

export const loadCharacters = createAsyncThunk('characters/fetch', ({ page, filter }: queryArgument) => {
  return loadItems({ page, filter })
});

// export const loadCharById = createAsyncThunk('characters/fetchById', (id: number) => {
//   return loadChar(id)
// });
