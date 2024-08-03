import "./App.css";
import RoutesComponent from "./Routes";
import customTheme from "./pages/Home/Home.theme";
import { ThemeProvider, useTheme } from "@mui/material";

function App() {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <RoutesComponent />
    </ThemeProvider>
  );
}

export default App;
