import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <Box className={styles.page}>
      {/* <SiteNavigation /> */}
      <main className={styles.layout_content}>
        <Outlet />
      </main>
    </Box>
  );
}
