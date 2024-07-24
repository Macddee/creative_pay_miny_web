import { useState } from 'react'
import './App.css'
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Navbar from './components/Navbar'
import Employees from './pages/Employees'
import Utilities from './pages/Utilities';
import Reports from './pages/Reports';
import Processes from './pages/Processes';
import Transactions from './pages/Transactions';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/utilities">
          <Utilities />
        </Route>
        <Route path="/reports">
          <Reports />
        </Route>
        <Route path="/processes">
          <Processes />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
        <Route path="/employees">
          <Employees />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
    </>
    
  );
}

export default App;