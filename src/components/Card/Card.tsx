import * as React from 'react';
import { Box, Icon } from '@mui/material';
import CharacterDescription from '../CharacterDescription/CharacterDescription';

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
  card: Character,
}

const Card = ({ card }: Props) => {
  return (
    <Box component="article" sx={{
      display: 'flex',
      borderRadius: '9px',
      overflow: 'hidden',
      boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)'
      }}>
      <Icon sx={{
        minWidth: '229px',
        minHeight: '220px',
        '& > img': {
          width: '100%',
          height: '100%',
        }
      }}>
        <img src={card.image} alt={card.name} />
      </Icon>

      <Box sx={{
        backgroundColor: '#3C3E44',
        padding: '13px 13.5px',
        width: '100%'
      }}>
        <CharacterDescription card={card} />
      </Box>
    </Box>
  )
};

export default Card;
