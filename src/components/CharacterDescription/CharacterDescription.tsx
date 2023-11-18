import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { Character } from '../Card/Card';

const statusColor: {
  [key: string]: string
} = {
  unknown: '#9E9E9E',
  Alive:  '#55CC44',
  Dead :'#D63D2E',
}

export const whiteText = {
  color: '#F5F5F5',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '162.5%',
};

export const greyText = {
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '162.5%',
};

type Props = {
  margin?: string,
  card: Character,
}

const CharacterDescription = ({ card, margin }: Props) => {
  return (
    <Box sx={{
      margin,
    }}>
      <Typography variant="h2" sx={{
          color: '#F5F5F5',
          fontSize: '27px',
          fontStyle: 'normal',
          fontWeight: 800,
          lineHeight: '110%',
        }}>
          {card.name}
        </Typography>

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
            backgroundColor: `${statusColor[card.status]}`,
            float: 'left',
          }
        }}>
          {`${card.status} - ${card.species}`}
        </Typography>

        <Box sx={{
          marginBottom: '13.5px',
        }}>
          <Typography sx={{
            color: '#9E9E9E',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '173.333%',
          }}>
            Last known location:
          </Typography>
          <Typography sx={whiteText}>
            {card.location.name}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{
            ...greyText,
            color: '#9E9E9E',
          }}>
            First seen in:
          </Typography>

          <Typography sx={whiteText}>
            {card.episode[0].name}
          </Typography>
        </Box>
    </Box>
  )
};

export default CharacterDescription;
