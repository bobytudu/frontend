import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DRAWER_WIDTH } from 'constants/layout';
import FilterDrawer from 'components/drawer/FilterDrawer';
import ResponsiveDrawer from 'components/drawer/ResponsiveDrawer';

export default function SearchResults() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({
    priceRange: [0, 100000],
    categories: [],
    brands: []
  } as {
    priceRange: number[];
    categories: string[];
    brands: string[];
  });

  // Your existing handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilters(prev => ({ ...prev, priceRange: newValue as number[] }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  // Mock data - you might want to move these to a separate file or fetch from API
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas'];

  return (
    <Box sx={{ 
      display: 'flex',
      width: '100%',
      position: 'relative'
    }}>
      <ResponsiveDrawer
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      >
        <FilterDrawer
          filters={filters}
          categories={categories}
          brands={brands}
          handlePriceChange={handlePriceChange}
          handleCategoryChange={handleCategoryChange}
          handleBrandChange={handleBrandChange}
        />
      </ResponsiveDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: 'calc(100vh - 64px)',
          '@media (max-width: 600px)': {
            minHeight: 'calc(100vh - 56px)',
          }
        }}
      >
        {/* Your main content here */}
      </Box>
    </Box>
  );
}


