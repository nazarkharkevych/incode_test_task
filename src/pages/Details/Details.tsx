import * as React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import { /* useAppDispatch, */ useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import CharacterDescription, { greyText, whiteText } from '../../components/CharacterDescription/CharacterDescription';

const Details = () => {
  const characters = useAppSelector(state => state.characters);
  // const dispatch = useAppDispatch();

  React.useEffect(() => {
    // if (!characters.length) {
    // }
  }, []);

  const { id = "" } = useParams();

  const selectedChar = React.useMemo(() => {
    return characters.find(char => char.id === id)
  }, [id, characters]);

  console.log(characters, selectedChar, id);

  return (
    <Box component="section" sx={{
      background: '#272B33',
      flexGrow: 1,
      padding: '80px 110px 252px'
    }}>

      <Box component="article" sx={{
        display: 'flex',
      }}>
        <Icon sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          maxWidth: '595px',
          maxHeight: '572px',
          flexGrow: '1',
          borderRadius: '9px 0px 0px 9px',
          '& > img': {
            width: '100%',
            height: '100%',
          }
        }}>
          <img src={selectedChar?.image} alt={selectedChar?.name} />
        </Icon>

        <Box sx={{
          backgroundColor: '#3C3E44',
          padding: '12px 16px 102px 42px',
          width: '100%'
        }}>
          {selectedChar && (
            <CharacterDescription margin="0px 0px 33px 0px" card={selectedChar} />
          )}

          <Box>
            <Typography sx={{
              ...greyText,
                color: '#9E9E9E',
            }}>
              Other Info:
            </Typography>
            <Typography sx={{
              ...whiteText,
            }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate amet voluptatibus accusamus ipsa nihil veniam esse, magni vero modi labore ipsam laborum totam officia dolores qui tempora harum incidunt reiciendis?
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default Details;
