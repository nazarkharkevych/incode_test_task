import { createAsyncThunk } from '@reduxjs/toolkit';
import { InitialValues } from '@/pages/MainPage/MainPage';
import request, { gql } from 'graphql-request';
import { Character } from '@/components/CharacterCard/CharacterCard';

type ReturnCharactersType = {
  characters: {
    info: {
      count: number | null,
      next: number | null,
      prev: number | null
    },
    results: Character[],
  };
}

type CharacterFilters = InitialValues['filters']['character'];

type QueryArgument = {
  page?: number
  filters?: CharacterFilters
}

export const loadCharacters = createAsyncThunk(
  'characters/fetch',
  thunkCallback,
);

function thunkCallback(
  { page, filters }: QueryArgument
): Promise<ReturnCharactersType> {
  return request('https://rickandmortyapi.com/graphql', gql`
    query getCharacters(
        $page: Int = 1,
        $filters: FilterCharacter,
      ) {
    characters(page: $page, filter: $filters) {
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
          type
          gender
          image
          location {
            id
            name
            type
            dimension
          }
          episode {
            id
            name
            episode
          }
        }
      }
    }
  `,
    {
    page,
    filters
  })
}
