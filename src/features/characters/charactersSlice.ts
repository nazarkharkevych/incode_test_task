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
  },
  extraReducers: (builder) => {
    builder.addCase(loadCharacters.fulfilled, (state, action) => {
      console.log(action.payload);
      
      return state.concat(action.payload.characters.results)
    })
  },
});

export const {
  add,
} = charactersSlice.actions;

export default charactersSlice.reducer;

type FilterCharacter = {
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  dimension: string,
  episodes: string,
}

type queryArgument = {
  page?: number
  filter?: FilterCharacter
  filterBy?: string[]
}

type ReturnCharacters = {
  characters: {
    results: Character[],
  }
}

// type ReturnCharacterById = {
//   character: Character
// }

const loadItems = ({ page, filter, filterBy }: queryArgument): Promise<ReturnCharacters> => {

  const episodes = filterBy?.includes('Episodes');
  const location = filterBy?.includes('Location');
  const characters = filterBy?.includes('Character');

  const characterFilter = {
    name: filter?.name,
    status: filter?.status,
    species: filter?.species,
    type: filter?.type,
    gender: filter?.gender,
  };

  const episodeFilter = {
    name: filter?.name,
    episode: filter?.episodes,
  };

  const locationFilter = {
    name: filter?.name,
    type: filter?.type,
    dimension: filter?.dimension,
  };

  return request('https://rickandmortyapi.com/graphql', gql`
    query getCharacters(
        $page: Int = 1,
        $episodes: Boolean = false,
        $location: Boolean = false,
        $characters: Boolean = true,
        $characterFilter: FilterCharacter,
        $episodeFilter: FilterEpisode,
        $locationFilter: FilterLocation,
      ) {
    characters(page: $page, filter: $characterFilter) @include(if:$characters) {
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
      episodes(page: $page, filter: $episodeFilter) @include(if: $episodes) {
        info {
          count
          next
          prev
        }
        results {
          id
          name
          air_date
        }
      }
      locations(page: $page, filter: $locationFilter) @include(if: $location) {
        info {
          count
          next
          prev
        }
        results {
          id
          name
          type
          dimension
        }
      }
    }
  `,
    {
    page,
    characterFilter,
    episodeFilter,
    locationFilter,
    episodes,
    location,
    characters
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

// type FilterQuery = {
//   page?: number,
//   filterBy: string[]
// }

export const loadCharacters = createAsyncThunk('characters/fetch', ({ page, filter, filterBy }: queryArgument) => {
  return loadItems({ page, filter, filterBy })
});

// export const loadApiItems = createAsyncThunk('characters/fetchData', ({
//   page, filterBy
// }))

// export const loadCharById = createAsyncThunk('characters/fetchById', (id: number) => {
//   return loadChar(id)
// });
