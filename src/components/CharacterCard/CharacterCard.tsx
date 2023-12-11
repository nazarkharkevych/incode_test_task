import * as React from 'react';
import { Box, Icon } from '@mui/material';
import { itemCard } from '@/styles/styles';
import NoImage from '@/images/no-image.png';
import CharacterDescription from '../CharacterDescription/CharacterDescription';

export interface Character {
  id: string,
  name: string,
  status: string,
  species: string,
  image: string,
  location: {
      id: number | null,
      name: string,
      type: string | null,
      dimension: string | null,
  },
  episode: {
    id: string,
    name: string,
    episode: string,
  }[],
}

type Props = {
  card: Character,
}

const CharacterCard = ({ card }: Props) => {
  return (
    <Box component="article" sx={itemCard.article}>
      <Icon sx={{
        minWidth: '229px',
        minHeight: '220px',
        '& > img': {
          width: '100%',
          height: '100%',
        }
      }}>
        <img src={'image' in card ? card.image : NoImage} alt={card.name} />
      </Icon>

      <Box sx={itemCard.content}>
        <CharacterDescription character={card} />
      </Box>
    </Box>
  )
};

export default CharacterCard;
