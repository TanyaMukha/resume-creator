import { useEffect } from "react";
import "./App.scss";
import RoutesComponent from "./Routes";
import { MigrationService } from "./database/services/MigrationService";

function App() {
  // const outerTheme = useTheme();

  useEffect(() => {
    MigrationService.checkUpdatingDatabase();
  }, [])

  return (
    // <ThemeProvider theme={customTheme(outerTheme)}>
      <RoutesComponent />
    // </ThemeProvider>
  );
}

export default App;
