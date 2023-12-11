import * as React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useFormikContext } from 'formik';
import { InitialValues, itemsPerPage } from '@/pages/MainPage/MainPage';
import loadAndFilterCharacters from '@/redux/actions/loadAndFilterCharacters';

const shevronStyles = {
  width: '24px',
  height: '24px',
  color: '#272B33',
}

type Props = {
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const PaginationBar = ({ setCurrentPage, currentPage }: Props) => {
  const totalItemsCount = useAppSelector(state => state.store.totalCount);
  const maxPagesCount = React.useMemo(() => {
    return Math.ceil(totalItemsCount / itemsPerPage);
  }, [totalItemsCount, itemsPerPage]);

  const dispatch = useAppDispatch();
  const { values } = useFormikContext<InitialValues>();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(values);

    setCurrentPage(page);
    dispatch(loadAndFilterCharacters({
      page,
      formValues: values,
    }));
  };

  return (
    <Pagination
      onChange={handleChange}
      count={maxPagesCount}
      variant="outlined"
      shape="rounded"
      page={currentPage}
      renderItem={(item) => (
        <PaginationItem components={{
          next: (props) => (
            <ChevronRightIcon sx={shevronStyles} {...props} />
          ),
          previous: (props) => (
            <ChevronLeftIcon sx={shevronStyles} {...props}/>
          )
        }} sx={{
          width: '34px',
          height: '34px',
          margin: '0 5px',
          border: 'none',
          color: '#F5F5F5',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '150%',
          letterSpacing: '0.5px',
          background: '#3C3E44',
          boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px 0px rgba(0, 0, 0, 0.20)',
          '&.Mui-selected': {
              background: '#F5F5F5',
              boxShadow: '0px 5px 14px 0px rgba(0, 0, 0, 0.12), 0px 9px 10px 0px rgba(0, 0, 0, 0.14), 0px 5px 5px 0px rgba(0, 0, 0, 0.20)',
              color: '#202329',
              '&:hover': {
                color: '#F5F5F5',
              }
          },
          '&.MuiPaginationItem-previousNext': {
            background: '#F5F5F5',
            '&:disabled': {
              background: '#9E9E9E'
            },
            '&:disabled > svg': {
              color: 'rgba(39, 43, 51, 0.60)',
            }
          }
        }} {...item}/>
      )}
    />
  )
};

export default PaginationBar;
