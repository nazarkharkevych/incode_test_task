import * as React from 'react';
import { Box, Button} from '@mui/material';
import FormComponent from '../FormComponent/FormComponent';

const FilterBar = () => {
  return (
    <Box sx={{
      display: 'flex',
    }}>
      <Button variant="text" sx={buttonStyles}>
        Filter
      </Button>

      <Box sx={{
        marginLeft: '20px',
      }}>
        <FormComponent />
      </Box>
    </Box>
  )
};

export const buttonStyles = {
  minWidth: '143px',
  borderRadius: '4px',
  background: '#f5f5f5',
  color: '#272B33',
  padding: '16px 16px',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '150%',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  '&:hover': {
    background: '#f5f5f5',
  },
};

export default FilterBar;
