import React from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import productsData from "data/products.json";

export default function SearchInput() {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = React.useState<
    typeof productsData.products
  >([]);
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const width = 500;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setShowResult(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim()) {
      const filtered = productsData.products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.description.toLowerCase().includes(value.toLowerCase()) ||
            product.category.toLowerCase().includes(value.toLowerCase()) ||
            product.brand.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 results
      setSearchResult(filtered);
      setShowResult(true);
    } else {
      setSearchResult([]);
      setShowResult(false);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setShowResult(false);
    setSearchInput("");
  };

  return (
    <ClickAwayListener onClickAway={() => setShowResult(false)}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          ml: 2,
          flexGrow: 1,
          position: "relative",
        }}
      >
        <OutlinedInput
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={handleSearch}
          onFocus={() => setShowResult(Boolean(searchInput.trim()))}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            width,
            transition: "width 0.5s",
            bgcolor: "background.color-background-grey",
            maxHeight: 38,
            borderRadius: 1,
          }}
          startAdornment={
            <SearchIcon sx={{ color: "text.color-text-clickable" }} />
          }
          placeholder="Search products, brands and more"
        />
        {searchResult.length > 0 && (
          <List
            dense
            className="search-result"
            sx={{
              position: "absolute",
              top: 40,
              width,
              display: showResult ? "block" : "none",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              bgcolor: "background.paper",
              zIndex: 1000,
            }}
            component={Paper}
          >
            {searchResult.map((product) => (
              <ListItemButton
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                <ListItemAvatar>
                  <Avatar
                    src={product.image}
                    alt={product.name}
                    variant="rounded"
                    sx={{ width: 40, height: 40 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <React.Fragment>
                      {product.category} • {product.brand}
                      <Box component="span" sx={{ display: "block" }}>
                        ₹{product.price.toLocaleString()}
                      </Box>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </ClickAwayListener>
  );
}
