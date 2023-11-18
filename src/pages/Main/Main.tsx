import { Box, Button, Pagination, PaginationItem, Stack, Fab, Icon } from '@mui/material';
import * as React from 'react';
// import { useGetCharactersQuery } from '../../features/api/apiSlice';
import Card from '../../components/Card/Card';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadCharacters } from '../../features/characters/charactersSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';

const Main = () => {
  const itemsCount = 6;
  const totalItemsCount = 36;
  const [currentPage, setCurrentPage] = React.useState(1);
  // const { data } = useGetCharactersQuery({});
  const characters = useAppSelector(state => state.characters);
  const dispatch = useAppDispatch();

  console.log(characters);

  React.useEffect(() => {
    if (currentPage === 1 || currentPage === 3) {
      dispatch(loadCharacters({page: currentPage}))
    }
  }, [currentPage])

  const itemsOnPage = React.useMemo(() => {
      return characters.slice(
        (currentPage - 1) * itemsCount,
        Math.min(itemsCount * currentPage, totalItemsCount),
      )
  }, [characters, currentPage]);

  // console.log(itemsOnPage)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box component="section" sx={{
        background: '#272B33',
        flexGrow: 1,
        padding: '40px 106px 16px'
      }}>
      <Button variant="text" sx={{
        borderRadius: '4px',
        background: '#F5F5F5',
        color: '#272B33',
        padding: '16px 46px',
        '&:hover': {
          background: '#F5F5F5',
        },
      }}>
        Filter
      </Button>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
        gap: '27px',
        paddingBlock: '20px'
      }}>
        {itemsOnPage && itemsOnPage.map(char => (
          <Link key={char.id} to={`${char.id}`}>
            <Card card={char} />
          </Link>
        ))}
      </Box>

      <Stack spacing="24px" sx={{
        position: 'relative',
        left: '100%',
        maxWidth: '88px',
        alignItems: 'center'
      }}>
        <Fab sx={{
          width: '40px',
          height: '40px',
        }}>
          <ErrorOutlineIcon />
        </Fab>

        <Fab sx={{
          width: '40px',
          height: '40px',
        }}>
          <DownloadIcon />
        </Fab>

        <Fab variant="circular">
          <Icon sx={{
            width: '24px',
            height: '24px',
            '& > img': {
              verticalAlign: 'top'
            }
          }}>
            <MoreVertIcon sx={{ verticalAlign: 'top' }} />
          </Icon>
        </Fab>
      </Stack>

      <Stack spacing={2} sx={{
        alignItems: 'center'
      }}>
        <Pagination
          onChange={handleChange}
          count={6}
          variant="outlined"
          shape="rounded"
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
      </Stack>
    </Box>
  )
};

export default Main;

const shevronStyles = {
  width: '24px',
  height: '24px',
  color: '#272B33',
}
