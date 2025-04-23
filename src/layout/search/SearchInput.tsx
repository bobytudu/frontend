import React from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

import OutlinedInput from "@mui/material/OutlinedInput";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";

export default function SearchInput() {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = React.useState<any[]>([]);
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [searchInput, setSearchInput] = React.useState<string>("");
  const width = 500;

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setShowResult(false);
    }
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
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearch}
          onFocus={() => setShowResult(true)}
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
          placeholder="Search"
        />
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
          }}
          component={Paper}
        >
          <ListItemButton>
            <ListItemText primary="Result 1" secondary="category" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Result 2" secondary="category" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Result 3" secondary="category" />
          </ListItemButton>
        </List>
      </Box>
    </ClickAwayListener>
  );
}
