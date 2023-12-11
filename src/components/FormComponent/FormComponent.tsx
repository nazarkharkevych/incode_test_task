import * as React from 'react';
import { Button, FormControl, Select, MenuItem, Stack, ListItemText, Checkbox, Backdrop } from '@mui/material';
import { Form, useFormikContext } from 'formik';
import { InitialValues } from '@/pages/MainPage/MainPage';
import capitalize from '@/helpers/capitalize';
import DynamicFields from '../DynamicFields/DynamicFields';
import { buttonStyles } from '../FilterBar/FilterBar';

const selectValues = ['character', 'location', 'episodes'];

const FormComponent = () => {
  const formik = useFormikContext<InitialValues>();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isFiltersOpen = Boolean(isMenuOpen && formik.values.filterBy.length);

  const handleOpenFilters = (value?: string) => () => {
    if (formik.values.filterBy.includes(value || '')) {
      return;
    }

    setIsMenuOpen(true);
  };

  const handleCloseFilters = () => {
    setIsMenuOpen(false);
  };

  return (
    <Form>
      <Backdrop
        sx={{ color: '#fff', zIndex: 100}}
        open={false}
      >
      </Backdrop>
      <Stack spacing="28px" direction="row">
        <FormControl sx={{ m: 1, width: 213, mt: 3}}>
          <Select
            onOpen={handleOpenFilters()}
            id="select-item"
            name="filterBy"
            multiple
            displayEmpty
            value={formik.values.filterBy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.filterBy && Boolean(formik.errors.filterBy)
            }
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <>Select Item</>;
              }

              return selected.map(value => capitalize(value)).join(', ');
            }}
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
                onClick={handleOpenFilters(value)}
                key={value}
                value={value}
              >
                <ListItemText
                  primary={capitalize(value)}
                />
                <Checkbox
                  checked={formik.values.filterBy.indexOf(value) > -1}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DynamicFields
          isFiltersOpen={isFiltersOpen}
          handleCloseFilters={handleCloseFilters}
        />

        <Button type="submit" sx={buttonStyles}>
          Find
        </Button>
      </Stack>
    </Form>
  )
};

export default FormComponent;
