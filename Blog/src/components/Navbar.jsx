import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path === "/") return "BlogApp";
    if (path === "/authors") return "Authors";
    if (path === "/post") return "Post";
    return "BlogApp"; 
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(45deg, #6200ea, #03dac6)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "2rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              background: "linear-gradient(45deg, #ff4081, #ffd700)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              whiteSpace: "nowrap",
              "&:hover": {
                transform: "scale(1.05)",
                textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
              },
              transition: "transform 0.3s ease",
            }}
          >
            {getTitle()}
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenMenu}
            >
              <MenuIcon sx={{ color: "#ffffff" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              PaperProps={{
                sx: {
                  backgroundColor: "rgba(18, 18, 18, 0.9)",
                  color: "white",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                  borderRadius: "8px",
                },
              }}
            >
              <MenuItem
                component={Link}
                to="/"
                onClick={handleCloseMenu}
                sx={{
                  "&:hover": {
                    backgroundColor: "#03dac6",
                    color: "#121212",
                  },
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                component={Link}
                to="/authors"
                onClick={handleCloseMenu}
                sx={{
                  "&:hover": {
                    backgroundColor: "#03dac6",
                    color: "#121212",
                  },
                }}
              >
                Authors
              </MenuItem>
              <MenuItem
                component={Link}
                to="/post"
                onClick={handleCloseMenu}
                sx={{
                  "&:hover": {
                    backgroundColor: "#03dac6",
                    color: "#121212",
                  },
                }}
              >
                Post
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
             data-testid="home-button"
              component={Link}
              to="/"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "600",
                padding: "8px 20px",
                borderRadius: "30px",
                backgroundColor: "#03dac6",
                color: "#121212",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#018786",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              Home
            </Button>
            <Button
              data-testid="authors-button"
              component={Link}
              to="/authors"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "600",
                padding: "8px 20px",
                borderRadius: "30px",
                backgroundColor: "#03dac6",
                color: "#121212",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#018786",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              Authors
            </Button>
            <Button
              component={Link}
              to="/post"
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "600",
                padding: "8px 20px",
                borderRadius: "30px",
                backgroundColor: "#03dac6",
                color: "#121212",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#018786",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              Post
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
