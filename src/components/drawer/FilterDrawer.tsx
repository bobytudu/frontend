import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface FilterDrawerProps {
  filters: {
    priceRange: number[];
    categories: string[];
    brands: string[];
  };
  categories: string[];
  brands: string[];
  handlePriceChange: (event: Event, newValue: number | number[]) => void;
  handleCategoryChange: (category: string) => void;
  handleBrandChange: (brand: string) => void;
}

export default function FilterDrawer({
  filters,
  categories,
  brands,
  handlePriceChange,
  handleCategoryChange,
  handleBrandChange
}: FilterDrawerProps) {
  return (
    <Box sx={{ 
      p: 2,
      '& .MuiFormControlLabel-root': {
        marginRight: 0,
        '& .MuiTypography-root': {
          fontSize: '0.9rem',
          lineHeight: 1.3,
        }
      },
      '& .MuiFormGroup-root': {
        marginLeft: -1,
      }
    }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={filters.priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={100000}
        step={1000}
        sx={{ mx: 1 }}
      />

      <Typography gutterBottom sx={{ mt: 2 }}>Categories</Typography>
      <FormGroup>
        {categories.map(category => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                size="small"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>

      <Typography gutterBottom sx={{ mt: 2 }}>Brands</Typography>
      <FormGroup>
        {brands.map(brand => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                size="small"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>
    </Box>
  );
}