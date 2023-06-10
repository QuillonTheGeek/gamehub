import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div>
      <Grid
        templateAreas={{
          base: `"nav "" main"`,
          lg: `"nav nav ""aside main"`,
        }}
      >
        <GridItem area="nav">
          <Navbar />
        </GridItem>

        <Show above="lg">
          <GridItem area="aside" bg="blue">
            Aside
          </GridItem>
        </Show>

        <GridItem area="main" bg="gold">
          Main
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
