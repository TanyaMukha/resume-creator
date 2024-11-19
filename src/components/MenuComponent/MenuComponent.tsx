import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home,
  Description,
  Category,
  Person,
  Work,
  School,
  Settings,
  ChevronLeft,
} from "@mui/icons-material";

interface MenuComponentProps {
  open: boolean;
  drawerWidth: number;
  isMobile: boolean;
  variant?: "permanent" | "persistent" | "temporary";
  onClose?: () => void;
}

const menuItems = [
  { text: "Home", icon: <Home />, path: "/" },
  { text: "Personal Info", icon: <Person />, path: "/profile" },
  { text: "Experience", icon: <Work />, path: "/experience" },
  { text: "Education", icon: <School />, path: "/education" },
  { text: "Skill groups", icon: <Category />, path: "/skill-groups" },
  { text: "Templates", icon: <Description />, path: "/templates" },  
];

export const MenuComponent: React.FC<MenuComponentProps> = ({
  open,
  drawerWidth,
  isMobile,
  variant = "permanent",
  onClose,
}) => {
  const location = useLocation();

  const drawer = (
    <>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          Resume Creator
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose}>
            <ChevronLeft />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={isMobile ? onClose : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/settings"
            selected={location.pathname === "/settings"}
            onClick={isMobile ? onClose : undefined}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};
