import * as React from 'react';
import { Box, Icon } from '@mui/material';
import { itemCard } from '../../styles/styles';
import NoImage from '../../images/no-image.png';
import { Episode } from '../../features/characters/charactersSlice';

export interface Character {
  id: string,
  name: string,
  status: string,
  species: string,
  image: string,
  location: {
      id: number,
      name: string,
  },
  episode: {
    id: string,
    name: string
  }[],
}

type Props = {
  card: Character | Episode,
  children: React.ReactNode
}

const CharacterCard = ({ card, children }: Props) => {
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
        {children}
      </Box>
    </Box>
  )
};

export default CharacterCard;
