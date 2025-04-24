import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Page from "components/Page";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import InlineBox from "components/box/InlineBox";
import IconButton from "@mui/material/IconButton";
import Slider, { Settings } from "react-slick";
import productsData from "data/products.json";

// icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { useAppDispatch } from "redux/hooks";
import { openSnack } from "redux/reducers/snack.reducer";
import { addToCart } from 'redux/reducers/cart.reducer';

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Find the product from products.json
  const product = productsData.products.find((p) => p.id === id);

  // Redirect to 404 if product not found
  React.useEffect(() => {
    if (!product) {
      navigate("/404");
    }
  }, [product, navigate]);

  if (!product) return null;

  const breadcrumbs = [
    <Typography
      variant="subtitle2"
      component={Link}
      key="1"
      color="inherit"
      to="/"
    >
      Home
    </Typography>,
    <Typography
      variant="subtitle2"
      component={Link}
      key="2"
      to="/category"
      color="inherit"
    >
      {product.category}
    </Typography>,
    <Typography variant="subtitle2" key="3" color="text.primary">
      {product.name}
    </Typography>,
  ];

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
    dispatch(
      openSnack({
        open: true,
        message: isFavorite ? "Removed from favorites" : "Added to favorites",
        severity: isFavorite ? "warning" : "success",
      })
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
      })
    );
    dispatch(
      openSnack({
        open: true,
        message: "Added to cart",
        severity: "success",
      })
    );
  };

  const handleBuyNow = () => {
    // First add to cart
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
      })
    );
    // Then navigate to checkout
    navigate('/checkout');
  };

  return (
    <Page title={product.name}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid
            item
            container
            spacing={2}
            xs={12}
            md={4}
            sx={{ maxHeight: 400 }}
          >
            <Grid item xs={12}>
              <Box position="relative" width="100%">
                <IconButton
                  onClick={toggleFavorite}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    bgcolor: "white",
                    "&:hover": { bgcolor: "white" },
                  }}
                >
                  {isFavorite ? (
                    <FavoriteOutlinedIcon color="primary" />
                  ) : (
                    <FavoriteBorderOutlinedIcon />
                  )}
                </IconButton>
                <img
                  style={{
                    width: "100%",
                    maxHeight: 300,
                    minHeight: 300,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                  src={product.image}
                  alt={product.name}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="large"
                sx={{
                  color: "white",
                  bgcolor: "#FF9F01",
                  "&:hover": { bgcolor: "#FF7604" },
                }}
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="large"
                sx={{
                  color: "white",
                  bgcolor: "#FB641B",
                  "&:hover": { bgcolor: "#FB341B" },
                }}
                fullWidth
                startIcon={<FlashOnOutlinedIcon />}
                onClick={handleBuyNow}
              >
                BUY NOW
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, my: 1 }}
              component="h1"
              gutterBottom
            >
              {product.name}
            </Typography>
            <InlineBox>
              <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                ₹{product.price.toLocaleString()}
              </Typography>
            </InlineBox>
            <InlineBox>
              <Chip
                size="small"
                sx={{ borderRadius: "4px", bgcolor: "green", color: "white" }}
                label={product.rating}
                icon={<StarOutlinedIcon color="inherit" />}
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {product.reviews} Reviews
              </Typography>
            </InlineBox>
            <Box
              borderRadius={1}
              border="1px solid rgba(0,0,0,0.1)"
              my={2}
              p={2}
            >
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </Box>
            <Box
              borderRadius={1}
              border="1px solid rgba(0,0,0,0.1)"
              my={2}
              p={2}
            >
              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>
              <Typography variant="body2" component="div">
                <Box component="ul" sx={{ pl: 2 }}>
                  <Box component="li" sx={{ mb: 1 }}>
                    Brand: {product.brand}
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    Category: {product.category}
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    Sub-Category: {product.subCategory}
                  </Box>
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
