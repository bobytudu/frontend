import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DRAWER_WIDTH } from 'constants/layout';
import FilterDrawer from 'components/drawer/FilterDrawer';
import ResponsiveDrawer from 'components/drawer/ResponsiveDrawer';
import productsData from 'data/products.json';
import ProductCard from 'components/ProductCard';

const ITEMS_PER_PAGE = 12;

export default function SearchResults() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState({
    priceRange: [0, 100000],
    categories: [],
    brands: [],
  } as {
    priceRange: number[];
    categories: string[];
    brands: string[];
  });

  // Filter products based on search query and filters
  const filteredProducts = React.useMemo(() => {
    return productsData.products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);

      return matchesSearch && matchesPrice && matchesCategory && matchesBrand;
    });
  }, [searchQuery, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [searchQuery, filters]);

  const categories = Array.from(
    new Set(productsData.products.map((p) => p.category))
  );
  const brands = Array.from(new Set(productsData.products.map((p) => p.brand)));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue as number[] }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleBrandChange = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
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
          minHeight: "calc(100vh - 64px)",
          "@media (max-width: 600px)": {
            minHeight: "calc(100vh - 56px)",
          },
        }}
      >
        <Typography variant="h5" gutterBottom>
          Search Results for "{searchQuery}"
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {filteredProducts.length} products found
        </Typography>

        <Grid container spacing={2}>
          {paginatedProducts.map((product) => (
            <Grid item key={product.id} xs={6} sm={4} md={3} lg={2}>
              <ProductCard
                product={product}
                
              />
            </Grid>
          ))}
          {filteredProducts.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", py: 5, color: "text.secondary" }}>
                <Typography variant="h6">
                  No products found matching your criteria
                </Typography>
                <Typography variant="body2">
                  Try adjusting your search or filter parameters
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? "small" : "medium"}
          />
        </Box>
      </Box>
    </Box>
  );
}




