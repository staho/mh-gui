import './App.css';
import { Grid } from '@material-ui/core';
import AppBar from './Components/AppBar';
import Parameters from './Components/Parameters';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Grid
            style={{height: "100vh"}}
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch">
              <Grid item>
                <AppBar>

                </AppBar>
              </Grid>
              <Grid item style={{height: "90vh"}} container direction="row" justify="center" alignItems="center">
                <Parameters />
              </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
