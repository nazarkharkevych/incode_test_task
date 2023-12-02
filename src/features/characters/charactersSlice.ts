import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character } from '../../components/CharacterCard/CharacterCard';
import request, { gql } from 'graphql-request';

type InitialState = {
  characters: Character[],
  episodes: Episode[],
  locations: Location[],
  totalCount: number,
}

const initialState = {
  characters: [],
  episodes: [],
  locations: [],
  totalCount: 0,
} as InitialState;

export const charactersSlice = createSlice({
  name: 'store',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loadCharacters.pending, (state) => {
      state.totalCount = 0;
    }),
    builder.addCase(loadCharacters.fulfilled, (state, action) => {
      console.log(action.payload);
      const { characters, locations, episodes } = action.payload;

      if (characters) {
        state.characters = characters.results;
        state.totalCount += characters.info.count || 0;
      } else {
        state.characters = [];
      }

      if (locations) {
        state.locations = locations.results;
        state.totalCount += locations.info.count || 0;
      } else {
        state.locations = [];
      }

      if (episodes) {
        state.episodes = episodes.results;
        state.totalCount += episodes.info.count || 0;
      } else {
        state.episodes = [];
      }
    })
  },
});

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

type QueryArgument = {
  page?: number
  filter?: FilterCharacter
  filterBy?: string[]
}

export interface Location {
  id: string
  name: string
  type: string
  dimension: string
}

export interface Episode {
  id: string
  name: string
  air_date: string
  episode: string
}

type ReturnCharacters = {
  characters?: {
    results: Character[],
  } & Info;
  locations?: {
    results: Location[],
  } & Info;
  episodes?: {
    results: Episode[],
  } & Info;
}

type Info = {
  info: {
    count: number | null,
    next: number | null,
    prev: number | null
  }
}

type LoadItems = (query: QueryArgument) => Promise<ReturnCharacters>;

const loadItems: LoadItems = ({ page, filter, filterBy }) => {
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
          episode
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

const thunkCallback = ({ page, filter, filterBy }: QueryArgument) => {
  return loadItems({ page, filter, filterBy });
}

export const loadCharacters = createAsyncThunk(
  'characters/fetch',
  thunkCallback,
);
