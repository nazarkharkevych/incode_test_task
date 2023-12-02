import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { Character } from '../CharacterCard/CharacterCard';
import { itemCard } from '../../styles/styles';
import { Episode } from '../../features/characters/charactersSlice';

const statusColor: {
  [key: string]: string
} = {
  unknown: '#9E9E9E',
  Alive:  '#55CC44',
  Dead :'#D63D2E',
}

const whiteText = itemCard.text.white;
const greyText = itemCard.text.grey;

type Props = {
  margin?: string,
  character?: Character,
  episode?: Episode,
  withStatus: boolean,
}

const CharacterDescription = ({ character: card, margin, withStatus }: Props) => {
  return (
    <Box sx={{
      margin,
    }}>
      <Typography variant="h2" sx={itemCard.text.h2}>
        {card?.name}
      </Typography>

      {withStatus && (
        <Typography sx={{
          ...greyText,
          color: '#FFF',
          marginBottom: '12.5px',
          '&::before': {
            content: '""',
            display: 'block',
            marginRight: '7px',
            marginTop: '10px',
            width: '9px',
            height: '9px',
            borderRadius: '4.5px',
            backgroundColor: `${statusColor[card?.status || 'unknown']}`,
            float: 'left',
          }
        }}>
          {`${card?.status} - ${card?.species}`}
        </Typography>
      )}

      <Box sx={{
        marginBottom: '13.5px',
      }}>
        <Typography sx={{
          ...greyText,
          fontSize: '15px',
          lineHeight: '173.333%',
        }}>
          Last known location:
        </Typography>
        <Typography sx={whiteText}>
          {card?.location.name}
        </Typography>
      </Box>

      <Box>
        <Typography sx={{
          ...greyText,
        }}>
          First seen in:
        </Typography>

        <Typography sx={whiteText}>
          {card?.episode[0].name}
        </Typography>
      </Box>
    </Box>
  )
};

export default CharacterDescription;
