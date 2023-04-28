import { useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Home from "./AllNFTs";
import Create from "./Create";

const logo = require("./VideoJockey2.png");

const Navigation = ({ web3Handler, account }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const pages = ["Home", "Create NFT", "My NFT's", "Buy Creator NFT's"];
  const links = ["/", "/create", "/my-purchases", "/all-nfts"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static" color="inherit">
    //     <Container>
    //       <Toolbar>
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           aria-label="menu"
    //           sx={{ mr: 2 }}
    //           onClick={toggleDrawer}
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <img src={logo} width="150" height="100" />
    //         <Box sx={{ flexGrow: 1 }} />
    //         <div>
    //           <Button color="inherit" component={Link} to="/">
    //             Home
    //           </Button>
    //           <Button color="inherit" component={Link} to="/create">
    //             Create
    //           </Button>
    //           <Button color="inherit" component={Link} to="/my-listed-items">
    //             My Listed Items
    //           </Button>
    //           <Button color="inherit" component={Link} to="/my-purchases">
    //             My Purchases
    //           </Button>
    //           <Button color="inherit" component={Link} to="/all-rooms">
    //             All rooms
    //           </Button>
    //         </div>
    //         <div>
    //           <Button
    //             color="inherit"
    //             href={`https://etherscan.io/address/${account}`}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             {account
    //               ? `${account.slice(0, 5)}...${account.slice(38, 42)}`
    //               : ""}
    //           </Button>
    //         </div>
    //       </Toolbar>
    //     </Container>
    //   </AppBar>
    //   <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
    //     <List>
    //       {links.map((link) => (
    //         <ListItem
    //           button
    //           key={link.label}
    //           component={Link}
    //           to={link.link}
    //           onClick={toggleDrawer}
    //         >
    //           <ListItemText primary={link.label} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </Drawer>
    // </Box>

    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "revert-layer",
              fontWeight: 300,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Video Jockey
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
                <MenuItem
                  key={page}
                  component={Link}
                  to={links[index]}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "cursive",
              fontWeight: 100,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Video Jockey
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={links[index]}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              color="inherit"
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {account
                ? `${account.slice(0, 5)}...${account.slice(38, 42)}`
                : ""}
            </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              onClose={handleCloseUserMenu}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
