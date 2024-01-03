import React from "react";
import Page from "components/Page";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import InlineBox from "components/box/InlineBox";
import IconButton from "@mui/material/IconButton";
import SpecificationTable from "./SpecificationTable";
import Slider, { Settings } from "react-slick";

//icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import details from "./details.json";
import { useAppDispatch } from "redux/hooks";
import { openSnack } from "redux/reducers/snack.reducer";
import axios from "axios";

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
    Category
  </Typography>,
  <Typography variant="subtitle2" key="3" color="text.primary">
    Product
  </Typography>,
];
const buttonStyle = {
  display: "block",
  border: "none",
  background: "rgba(0,0,0,0.3)",
  position: "absolute",
  top: "5%",
  height: "100%",
};
function SampleNextArrow(props: any) {
  const { style, onClick } = props;
  return (
    <button
      // className={className}
      style={{
        ...style,
        ...buttonStyle,
        right: -40,
      }}
      onClick={onClick}
    >
      <ChevronRightIcon />
    </button>
  );
}
function SamplePrevArrow(props: any) {
  const { style, onClick } = props;
  return (
    <button
      // className={className}
      style={{
        ...style,
        ...buttonStyle,
        left: -40,
      }}
      onClick={onClick}
    >
      <ChevronLeftIcon />
    </button>
  );
}

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [showDescription, setShowDescription] = React.useState(true);
  const [images, setImages] = React.useState<
    { image: string; thumb: string }[]
  >([]);
  const [activeImage, setActiveImage] = React.useState(0);

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      dispatch(
        openSnack({
          open: true,
          message: "Removed from favorites",
          severity: "warning",
        })
      );
    } else {
      dispatch(
        openSnack({
          open: true,
          message: "Added to favorites",
          severity: "success",
        })
      );
    }
  }

  React.useEffect(() => {
    async function getImages() {
      try {
        const { data } = await axios.get(
          "https://api.unsplash.com/photos?per_page=10&page=1",
          {
            headers: {
              Authorization:
                "Client-ID tow9Mcd6eoN80DKASB2jdRXItfbOe46fiRuCHoLWogo",
            },
          }
        );
        const tempData = data.map((item: any) => ({
          image: item.urls.raw,
          thumb: item.urls.thumb,
        }));
        setImages(tempData);
      } catch (error: any) {
        dispatch(
          openSnack({ open: true, message: error.message, severity: "error" })
        );
      }
    }
    getImages();
  }, [dispatch]);

  console.log(images);

  return (
    <Page title="Product Details">
      <Container maxWidth="xl" sx={{ p: 3 }}>
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
                {images.length > 0 && (
                  <img
                    style={{
                      width: "100%",
                      maxHeight: 300,
                      minHeight: 300,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    src={images[activeImage].image}
                    alt={`slider-${activeImage}`}
                  />
                )}
              </Box>
              <Box
                maxWidth={200}
                m="auto"
                mt={2}
                borderRadius={1}
                // border="1px solid rgba(0,0,0,0.1)"
                maxHeight={200}
                sx={{
                  "& .slick-list": {
                    // maxWidth: 50,
                  },
                }}
              >
                <Slider {...settings}>
                  {images.map((image: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid red",
                        background: "red",
                        padding: 12,
                        cursor: "pointer",
                        paddingTop: 24,
                      }}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          marginTop: 10,
                        }}
                        src={image.image}
                        alt={`slider-${index}`}
                      />
                    </div>
                  ))}
                </Slider>
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
                onClick={() =>
                  dispatch(
                    openSnack({
                      open: true,
                      message: "Added to cart",
                      severity: "success",
                    })
                  )
                }
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
              {details.title}
            </Typography>
            <InlineBox>
              <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                ₹{details.price}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                  textDecoration: "line-through",
                  mx: 1,
                  opacity: 0.6,
                }}
                gutterBottom
              >
                ₹{details.mrp}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 400, color: "green" }}
                gutterBottom
              >
                {details.discount}% off
              </Typography>
            </InlineBox>
            <InlineBox>
              <Chip
                size="small"
                sx={{ borderRadius: "4px", bgcolor: "green", color: "white" }}
                label="5"
                icon={<StarOutlinedIcon color="inherit" />}
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {details.ratings.length} Ratings & {details.reviews.length}{" "}
                Reviews
              </Typography>
            </InlineBox>
            <Box borderRadius={1} border="1px solid rgba(0,0,0,0.1)" my={2}>
              <InlineBox justifyContent="space-between" p={1} px={2}>
                <Typography variant="h6">Description</Typography>
                <IconButton
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <ExpandMoreIcon
                    sx={{
                      transform: showDescription
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </IconButton>
              </InlineBox>
              <Collapse in={showDescription}>
                <Box p={2} borderTop="1px solid rgba(0,0,0,0.1)">
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.8, textAlign: "justify" }}
                  >
                    {details.description}
                  </Typography>
                </Box>
              </Collapse>
            </Box>
            <SpecificationTable data={details.specifications} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
