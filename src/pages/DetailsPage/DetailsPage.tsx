import * as React from 'react';
import { Box, Icon, Typography } from '@mui/material';
import { useAppSelector } from '@/redux/app/hooks';
import { useParams } from 'react-router-dom';
import CharacterDescription from '@/components/CharacterDescription/CharacterDescription';
import FabComponent from '@/components/Fab/FabComponent';
import { itemCard } from '@/styles/styles';

const DetailsPage = () => {
  const characters = useAppSelector(state => state.store.characters);

  const { id = "" } = useParams();

  const selectedChar = React.useMemo(() => {
    return characters.find(char => char.id === id)
  }, [id, characters]);

  console.log(characters, selectedChar, id);

  const greyText = itemCard.text.grey;
  const whiteText = itemCard.text.white;

  return (
    <Box component="section" sx={{
      background: '#272B33',
      flexGrow: 1,
      padding: '80px 110px 252px'
    }}>

      <Box component="article" sx={{
        display: 'flex',
        position: 'relative'
      }}>
        <Icon sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          maxWidth: '595px',
          maxHeight: '572px',
          flexGrow: '1',
          flexShrink: '1',
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
            <CharacterDescription margin="0px 0px 33px 0px" character={selectedChar} />
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

        <Box sx={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          transform: 'translateY(25%)'
        }}>
          <FabComponent disabled={true} />
        </Box>
      </Box>
    </Box>
  )
};

export default DetailsPage;
