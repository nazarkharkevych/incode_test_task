import { Box, Stack } from '@mui/material';
import * as React from 'react';
import CharacterCard from '../../components/CharacterCard/CharacterCard';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadCharacters } from '../../features/characters/charactersSlice';
import { Link } from 'react-router-dom';
import FabComponent from '../../components/Fab/FabComponent';
import FilterBar from '../../components/FilterBar/FilterBar';
import { Formik } from 'formik';
import * as yup from 'yup';
import PaginationBar from '../../components/PaginationBar/PaginationBar';
import CharacterDescription from '../../components/CharacterDescription/CharacterDescription';

export type InitialValues = {
  filterBy: string[],
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  dimension: string,
  episodes: string,
}

export const itemsPerPage = 20;

const initialValues = {
  filterBy: [],
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
  dimension: '',
  episodes: '',
} as InitialValues;

const validationSchema = yup.object({
  filterBy: yup
    .array()
    .of(yup.string())
    .min(1, 'Select item to search!'),
});

const Main = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    characters,
    locations,
    episodes,
  } = useAppSelector(state => state.store);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadCharacters({page: 1}))
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={
        (values) => {
          console.log(values);
    
          const { filterBy, ...filter } = values;

          setCurrentPage(1);
          dispatch(loadCharacters({page: 1, filter, filterBy}))}
      }
      validationSchema={validationSchema}
    >
      <Box component="section" sx={{
          background: '#272B33',
          flexGrow: 1,
          padding: '40px 106px 16px'
        }}>
        <FilterBar />

        <Box sx={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
          gap: '27px',
          paddingBlock: '20px'
        }}>
          {!!characters.length && characters.map(char => (
            <Link key={char.id} to={`${char.id}`}>
              <CharacterCard card={char}>
                <CharacterDescription withStatus={true} character={char} />
              </CharacterCard>
            </Link>
          ))}

          {!!locations.length && locations.map(location => (
            <Box key={location.id}>
              location
              {location.name}
            </Box>
          ))}

          {!!episodes.length && episodes.map(episode => (
            <Link key={episode.id} to={`${episode.id}`}>
              <CharacterCard card={episode}>
                <CharacterDescription withStatus={false} episode={episode} />
              </CharacterCard>
            </Link>
          ))}

          <Box sx={{
            position: 'absolute',
            right: '0',
            bottom: '10px',
            transform: 'translateX(50%)'
          }}>
            <FabComponent />
          </Box>
        </Box>

        <Stack spacing={2} sx={{
          alignItems: 'center'
        }}>
          <PaginationBar
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Stack>
      </Box>
    </Formik>
  )
};

export default Main;
