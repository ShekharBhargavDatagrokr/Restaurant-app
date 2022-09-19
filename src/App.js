import React from 'react';
import ReservationsPage from './pages/ReservationsPage';
import CreateReservation from './pages/CreateReservation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout';
const theme = createTheme({
  palette: {
    primary:{
      main:'#f3e5f5'
    },
    secondary:{
      main: '#800080'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Layout>
      <Switch>
        <Route exact path="/">
          <ReservationsPage />
        </Route>
        <Route path="/create">
          <CreateReservation />
        </Route>
      </Switch>
      </Layout>
    </Router>
    </ThemeProvider>
  )
}

export default App;
