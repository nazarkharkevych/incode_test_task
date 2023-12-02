import * as React from 'react';
import { Box, Button, FormControl, Select, MenuItem, Stack, ListItemText, Checkbox, TextField, Menu, Backdrop } from '@mui/material';
import { useFormikContext } from 'formik';
import { InitialValues } from '../../pages/Main/Main';

const selectValues = ['Character', 'Location', 'Episodes'];

const FilterBar = () => {
  const formik = useFormikContext<InitialValues>();

  // const formik = useFormik({
  //   initialValues: {
  //     filterBy: [],
  //     name: '',
  //     status: '',
  //     species: '',
  //     type: '',
  //     gender: '',
  //     dimension: '',
  //     episodes: '',
  //   } as InitialValues,
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     console.log(values);

  //     const { filterBy, ...filter } = values;
      
  //     // alert(JSON.stringify(values, null, 2));
  //     setCurrentPage(1);
  //     dispatch(loadCharacters({page: 1, filter, filterBy}))
  //   },
  // });

  const ref = React.useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl && formik.values.filterBy.length);
  const handleClick = () => {
    setAnchorEl(ref.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fieldsToRender = {
    Character: ['status', 'species', 'gender'],
    Location: ['dimension'],
    Episodes: ['episodes'],
  }

  // const filterFields = ['name', 'status', 'species', 'type', 'gender', 'dimension', 'episodes'];

  return (
    <Box sx={{
      display: 'flex',
      // justifyContent: 'center'
    }}>
      <Button variant="text" sx={buttonStyles}>
        Filter
      </Button>

      <Box sx={{
        marginLeft: '161px',
      }}>
        <form onSubmit={formik.handleSubmit}>
          <Backdrop
            sx={{ color: '#fff', zIndex: 100}}
            open={false}
          >
          </Backdrop>
          <Stack spacing="28px" direction="row">
            <FormControl sx={{ m: 1, width: 213, mt: 3}}>
              <Select
                onClose={handleClose}
                onOpen={handleClick}
                id="select-item"
                name="filterBy"
                multiple
                value={formik.values.filterBy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.filterBy && Boolean(formik.errors.filterBy)}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <>Select Item</>;
                  }
      
                  return selected.join(', ');
                }}
                displayEmpty
                sx={{
                  ...buttonStyles,
                  borderRadius: '4px 4px 0px 0px',
                  padding: '8px 12px',
                  textTransform: 'initial',
                  '& > .MuiSelect-select': {
                    padding: '8px 0px'
                  }
                }}
              >
                {selectValues.map(value => (
                  <MenuItem
                    onClick={handleClick}
                    key={value}
                    value={value}
                  >
                    <ListItemText
                      primary={value}
                    />
                    <Checkbox
                      checked={formik.values.filterBy.indexOf(value) > -1}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <TextField ref={ref} sx={textFieldStyles}
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
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {!!formik.values.filterBy.length && (
                  <MenuItem sx={{
                    padding: '0px'
                  }}>
                   <TextField sx={textFieldStyles}
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      type="text"
                      variant="standard"
                      placeholder="Add name"
                      inputProps = {inputProps}
                    />
                  </MenuItem>
                )}
                {(!!formik.values.filterBy.includes('Character')
                  || !!formik.values.filterBy.includes('Location'))
                    && (
                    <MenuItem sx={{
                      padding: '0px'
                    }}>
                    <TextField sx={textFieldStyles}
                        id="type"
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        type="text"
                        variant="standard"
                        placeholder="Add type"
                        inputProps = {inputProps}
                      />
                    </MenuItem>
                  )}
                  {formik.values.filterBy.map(checkedValue => (
                    fieldsToRender[checkedValue as keyof typeof fieldsToRender]
                      .map(field => (
                      <MenuItem key={field} sx={{
                        padding: '0px'
                      }}>
                        <TextField sx={textFieldStyles}
                          id={field}
                          name={field}
                          value={formik.values[field as keyof InitialValues]}
                          onChange={formik.handleChange}
                          type="text"
                          variant="standard"
                          placeholder={`Add ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                          inputProps = {inputProps}
                        />
                      </MenuItem>
                  ))
                  ))}
              </Menu>
            </Box>

            <Button type="submit" sx={buttonStyles}>
              Find
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  )
};

const buttonStyles = {
  minWidth: '143px',
  borderRadius: '4px',
  background: '#F5F5F5',
  color: '#272B33',
  padding: '16px 16px',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '150%',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  '&:hover': {
    background: '#F5F5F5',
  },
};

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

const inputProps = {
  sx: {
    '&::placeholder': {
      color: 'inherit',
      opacity: 1,
    },
  },
}

export default FilterBar;
