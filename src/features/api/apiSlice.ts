// import { createApi } from '@reduxjs/toolkit/query/react';
// import { gql } from 'graphql-request';
// import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
// import { Character } from '../../components/Card/Card';

// const BASE_URL = 'https://rickandmortyapi.com/graphql';

// type FilterCharacter = {
//   name: string
//   status: string
//   species: string
//   type: string
//   gender: string
// }

// type queryArgument = {
//   page?: number
//   filter?: FilterCharacter
// }

// type ReturnCharacters = {
//   characters: {
//     results: Character[],
//   }
// }

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: graphqlRequestBaseQuery({ url: BASE_URL }),
//   endpoints: (builder) => ({
//     getCharacters: builder.query<ReturnCharacters, queryArgument>({
//       query: ({ page, filter }) => ({
//         document: gql`
//         query getCharacters($page: Int = 1, $filter: FilterCharacter) {
//           characters(page: $page, filter: $filter) {
//             info {
//               count
//               next
//               prev
//             }
//             results {
//               id
//               name
//               status
//               species
//               image
//               location {
//                 id
//                 name
//               }
//               episode {
//                 id
//                 name
//               }
//             }
//           }
//         }
//         `,
//         variables: {
//           page,
//           filter,
//         },
//       }),
//     }),
//     // getOneCharacter: builder.query<unknown, string>({
//     //   query: (id) => `${BASE_URL}/${id}.json`,
//     // }),
//   }),
// });

// export const { useGetCharactersQuery } = apiSlice;
