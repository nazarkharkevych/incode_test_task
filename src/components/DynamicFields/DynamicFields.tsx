import * as React from 'react';
import { TextField, MenuItem, Box, Menu } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { InitialValues } from '@/pages/MainPage/MainPage';
import { buttonStyles } from '../FilterBar/FilterBar';

interface FieldsToRender extends Record<string, string[]> {
  character: ['name', 'status', 'species', 'type', 'gender'],
  location: ['name', 'type', 'dimension'],
  episodes: ['name' ,'episodes'],
}

const fieldsToRender: FieldsToRender = {
  character: ['name', 'status', 'species', 'type', 'gender'],
  location: ['name', 'type', 'dimension'],
  episodes: ['name' ,'episodes'],
}

type Props = {
  isFiltersOpen: boolean;
  handleCloseFilters: () => void;
}

const DynamicFields = ({ isFiltersOpen, handleCloseFilters }: Props) => {
  const { values } = useFormikContext<InitialValues>();
  const textFieldRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box>
       <TextField
        ref={textFieldRef}
        sx={{
          ...textFieldStyles,
          background: '#f5f5f5'
        }}
        inputProps={inputPropsStyles}
        type="text"
        variant="standard"
        placeholder="Add key words to find"
        disabled
      />

      <Menu
        sx={{
          '& .MuiList-root': {
            padding: '0px'
          }
        }}
        anchorEl={textFieldRef.current}
        open={isFiltersOpen}
        onClose={handleCloseFilters}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {values.filterBy.map(checkedValue => (
          fieldsToRender[checkedValue].map(field => (
            <MenuItem key={field} sx={{
              padding: '0px'
            }}>
              <Field
                sx={textFieldStyles}
                variant="standard"
                type="text"
                as={TextField}
                inputProps={inputPropsStyles}
                name={`filters.${checkedValue}.${field}`}
                placeholder={`${checkedValue} ${field}`}
              />
            </MenuItem>
          ))
        ))}
      </Menu>
    </Box>
  )
};

const inputPropsStyles = {
  sx: {
    '&::placeholder': {
      color: 'inherit',
      opacity: 1,
    },
  },
}

const textFieldStyles = {
  ...buttonStyles,
  borderRadius: '4px 4px 0px 0px',
  padding: '0px',
  minWidth: 'auto',
  flex: '1 1 260px',
  '& .MuiInputBase-input': {
    padding: '16.5px 12px',
  },
}

export default DynamicFields;
