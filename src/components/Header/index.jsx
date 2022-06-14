import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import CommonStyles from "components/CommonStyles";
import { makeStyles } from "@mui/styles";
import { NavBarLinks, RouteBase } from "constants/routeUrl";
import { useGetUser } from "hooks/authentication/useAuthenticationHooks";
import { useTranslation } from "react-i18next";

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const useStyle = makeStyles((theme) => {
  return {
    appBar: {
      "& > div": {
        zIndex: 9,
        boxShadow: "2px -2px 2px rgba(0, 0, 0, 0.2)",
      },
    },
    link: {
      textDecoration: "none",
      "&.active > button": {
        position: "relative",
        color: theme.palette.primary.main,
        "&::before": {
          content: "''",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          backgroundColor: theme.palette.primary.main,
          opacity: 0.1,
          borderRadius: 8,
        },
      },
    },
  };
});

const ResponsiveAppBar = () => {
  //! State
  const classes = useStyle();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useGetUser();
  const { t } = useTranslation();

  //! Function
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  //! Render
  const renderMobile = () => {
    return (
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
          {NavBarLinks.map((page) => (
            <MenuItem key={page.label} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  const renderDesktop = () => {
    return (
      <React.Fragment>
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
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {NavBarLinks.map((page) => (
            <CommonStyles.NavLink key={page.path} className={classes.link} exact to={page.path}>
              <Button
                key={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                {page.label}
              </Button>
            </CommonStyles.NavLink>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          {user.isLogin ? (
            <Button variant="outline">{t("common:logout")}</Button>
          ) : (
            <CommonStyles.NavLink exact to={RouteBase().Login}>
              <Button variant="contained">{t("common:login")}</Button>
            </CommonStyles.NavLink>
          )}

          {/* <Tooltip title="Open settings">
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
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu> */}
        </Box>
      </React.Fragment>
    );
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {renderMobile()}
          {renderDesktop()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
