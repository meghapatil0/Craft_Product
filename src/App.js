
import "./App.css";
import Header from "./component/header/header";
import Contents from "./component/content/content";
import { Box } from "@material-ui/core";

const App = () => {
  return (
    <Box className="App">
      <Header />
      <Contents />
    </Box>
  );
};

export default App;
