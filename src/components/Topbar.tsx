import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import OutlinedInput from "@mui/material/OutlinedInput";

//icons
import { Icon } from "@iconify/react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { Link } from "react-router-dom";
import { logout } from "redux/reducers/auth.reducer";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "services/firebase";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import data from "utils/data.json";

import logoImg from "assets/logo_1.png";
import { openSnack } from "redux/reducers/snack.reducer";

const pages = ["Home", "Projects", "Images", "Assets"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function CustomList() {
  const [open, setOpen] = React.useState<number | null>(null);
  function handleClick(index: number) {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  }
  return (
    <Box sx={{ width: 350 }} role="presentation">
      <List>
        {data.map((item, index) => (
          <>
            <ListItem disablePadding key={item.title}>
              <ListItemButton onClick={() => handleClick(index)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.title} />
                {item.children &&
                  (open === index ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === index} timeout="auto" unmountOnExit>
              <List dense component="div" disablePadding sx={{ pl: 2 }}>
                {item.children.map((child: any) => (
                  <ListItemButton sx={{ pl: 4 }} key={child.title}>
                    {child.icon && (
                      <ListItemIcon>
                        <Icon
                          icon={child.icon}
                          style={{ width: 20, height: 20, color: "black" }}
                        />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={child.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </Box>
  );
}

function Topbar() {
  const {
    auth: { user },
  } = useAppSelector((state) => ({
    auth: state.auth,
  }));
  const dispatch = useAppDispatch();
  const [searchResult, setSearchResult] = React.useState<any[]>([]);
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (type?: string) => {
    try {
      setAnchorElUser(null);
      if (type === "Logout") {
        await signOut(firebaseAuth);
        localStorage.clear();
        dispatch(logout());
      }
    } catch (error: any) {
      dispatch(openSnack({ message: error.message, type: "error" }));
    }
  };

  const width = 500;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "primary.main",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        px: 4,
      }}
    >
      <Drawer
        anchor="left"
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        <Box
          sx={{
            width: 350,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            py: 4,
            bgcolor: "primary.main",
          }}
          role="presentation"
        >
          <img
            src={logoImg}
            alt="brand_logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <CustomList />
      </Drawer>
      <Toolbar disableGutters>
        {/* <Box sx={{ display: { xs: "flex", md: "none" } }}> */}
        <Box sx={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon style={{ width: 30, color: "white" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page, index) => (
              <MenuItem key={`page_${index}`} onClick={handleCloseNavMenu}>
                <Link to={page === "Home" ? "/" : `/${page.toLowerCase()}`}>
                  <Typography
                    textAlign="center"
                    sx={{ textDecoration: "none", color: "text.primary" }}
                  >
                    {page}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            flexGrow: { xs: 1, md: 0 },
          }}
        >
          <Link to="/">
            <img
              src={logoImg}
              alt="brand_logo"
              style={{ width: 100, height: 20 }}
            />
          </Link>
        </Box>
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

        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Tooltip title="Cart" arrow>
            <IconButton sx={{ mr: 1 }}>
              <Badge
                badgeContent={4}
                max={9}
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: "black",
                    color: "white",
                  },
                }}
              >
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Wishlist" arrow>
            <IconButton sx={{ mr: 1 }}>
              <Badge
                badgeContent={4}
                max={9}
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: "black",
                    color: "white",
                  },
                }}
              >
                <FavoriteOutlinedIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                style={{ width: 35, height: 35 }}
                alt={`${user?.displayName}`}
                src={`${user?.photoURL}`}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={() => handleCloseUserMenu()}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Topbar;
