import { AppDispatch, RootState } from '@/redux/app/store';
import { useDispatch } from 'react-redux';
import { loadCharacters } from '../thunks/loadCharacters';
import { InitialValues } from '@/pages/MainPage/MainPage';
import { addCharacters } from '../features/characters/charactersSlice';
import standardize from '@/helpers/standardize';

type QueryArguments = {
  page?: number,
  formValues: InitialValues
}

const loadAndFilterCharacters = (values: QueryArguments) => {
  return async (
    dispatch: ReturnType<typeof useDispatch<AppDispatch>>,
    getState: () => RootState,
  ) => {
    const { page, formValues } = values;
    const {
      filterBy,
      filters: { character, location, episodes },
    } = formValues;

    if (filterBy.includes('character')) {
      await dispatch(loadCharacters({ page, filters: character }));
    }

    const { store: { characters } } = getState();
    let filteredCharacters = [...characters];

    if (filterBy.includes('location')) {
      const { name, dimension, type } = location;

      filteredCharacters = characters.filter(({ location }) => {
        const locationMatches = (
          standardize(location.name).includes(name) &&
          standardize(location.type || '').includes(type) &&
          standardize(location.dimension || '').includes(dimension)
        );

        return locationMatches;
      });
    }

    if (filterBy.includes('episodes')) {
      const { name, episodes: filterEpisodes } = episodes;

      filteredCharacters = characters.filter(({ episode }) => {
        const episodeMatches = episode.some(episode => {
          return (
            standardize(episode.name).includes(name) &&
            standardize(episode.episode).includes(filterEpisodes)
          );
        })

        return episodeMatches;
      });
    }

    dispatch(addCharacters(filteredCharacters));
  };
}

export default loadAndFilterCharacters;
