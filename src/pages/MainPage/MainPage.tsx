/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack } from '@mui/material';
import * as React from 'react';
import CharacterCard from '@/components/CharacterCard/CharacterCard';

import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { Link } from 'react-router-dom';
import FabComponent from '@/components/Fab/FabComponent';
import FilterBar from '@/components/FilterBar/FilterBar';
import { Formik } from 'formik';
import * as yup from 'yup';
import PaginationBar from '@/components/PaginationBar/PaginationBar';
import { loadCharacters } from '@/redux/thunks/loadCharacters';
import loadAndFilterCharacters from '@/redux/actions/loadAndFilterCharacters';

export interface InitialValues {
  filterBy: string[];
  filters: {
    character: {
      name: string,
      status: string,
      species: string,
      type: string,
      gender: string,
    },
    location: {
      name: string,
      type: string,
      dimension: string,
    },
    episodes: {
      name: string,
      episodes: string,
    }
  }
}

export const itemsPerPage = 20;

const initialValues: InitialValues = {
  filterBy: [],
  filters: {
    character: {
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
    },
    location: {
      name: '',
      type: '',
      dimension: '',
    },
    episodes: {
      name: '',
      episodes: '',
    }
  }
};

const validationSchema = yup.object({
  filterBy: yup
    .array()
    .of(yup.string())
    .min(1, 'Select item to search!'),
});

const MainPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    characters,
  } = useAppSelector(state => state.store);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (values: InitialValues) => {
    console.log(values);

    setCurrentPage(1);
    dispatch(loadAndFilterCharacters({ page: 1, formValues: values }));
  }

  React.useEffect(() => {
    dispatch(loadCharacters({ page: 1 }));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
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
              <CharacterCard card={char} />
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

export default MainPage;
