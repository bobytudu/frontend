import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DRAWER_WIDTH = 240;

const ProductCard = ({ product }: { product: any }) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardMedia
      component="img"
      height="140"
      image={product.image}
      alt={product.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ${product.price}
      </Typography>
    </CardContent>
  </Card>
);

const SearchResults = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Sample data
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 900) + 100,
    image: "/api/placeholder/200/140",
  }));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filters = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue as number[])}
        valueLabelDisplay="auto"
        max={1000}
        sx={{ mt: 2, mb: 4 }}
      />

      <Typography gutterBottom>Categories</Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Electronics" />
        <FormControlLabel control={<Checkbox />} label="Clothing" />
        <FormControlLabel control={<Checkbox />} label="Books" />
      </FormGroup>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 2, mt: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
              },
            }}
          >
            {filters}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DRAWER_WIDTH,
              },
            }}
            open
          >
            {filters}
          </Drawer>
        )}
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchResults;
