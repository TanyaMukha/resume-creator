import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import { MenuComponent } from "../MenuComponent/MenuComponent";
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginLeft: `${drawerWidth}px`,
  }),
}));

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box className={styles.page}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { lg: `${open ? drawerWidth : 0}px` },
          display: { lg: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Resume Creator
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Navigation */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        {/* Mobile menu */}
        {isMobile && (
          <MenuComponent
            open={open}
            drawerWidth={drawerWidth}
            isMobile={true}
            variant="temporary"
            onClose={handleDrawerToggle}
          />
        )}

        {/* Desktop menu */}
        {!isMobile && (
          <MenuComponent
            open={open}
            drawerWidth={drawerWidth}
            isMobile={false}
            variant="permanent"
          />
        )}
      </Box>
      {/* Main content */}
      <Main open={open}>
        <Toolbar sx={{ display: { lg: "none" } }} />
        {children}
      </Main>
    </Box>
  );
}
