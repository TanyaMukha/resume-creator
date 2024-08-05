import { useEffect } from "react";
import "./App.css";
import RoutesComponent from "./Routes";
import customTheme from "./pages/Home/Home.theme";
import { ThemeProvider, useTheme } from "@mui/material";
import { MigrationService } from "./database/services/MigrationService";

function App() {
  const outerTheme = useTheme();

  useEffect(() => {
    MigrationService.checkUpdatingDatabase();
  }, [])

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <RoutesComponent />
    </ThemeProvider>
  );
}

export default App;
