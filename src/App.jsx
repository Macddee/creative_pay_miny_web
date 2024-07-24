import { useState } from 'react'
import './App.css'
import { 
  BrowserRouter as Router,
  Route,
  
  Routes
} from 'react-router-dom';
import Navbar from './components/Navbar'
import Employees from './pages/Employees'
import Utilities from './pages/Utilities';
import Reports from './pages/Reports';
import Processes from './pages/Processes';
import Transactions from './pages/Transactions';
import Mainpage from './pages/Mainpage';
import Events from './components/Events';
import AddEvent from './components/AddEvent';
import HomeEmploy from './components/HomeEmploy';
import OtherLink from './components/OtherLink';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/utilities" element={<Utilities />} />
          <Route path="/reports" element={<Reports />} />

          <Route path="/processes" element={<Processes />} />
          <Route path="/transactions" element={<Transactions />} />

          <Route path="/employees" element={<Employees />}>
           
              <Route path="" element={<HomeEmploy />} />
              <Route path="events" element={<Events />} />
              <Route path="events/add" element={<AddEvent />} />
              <Route path="other-link" element={<OtherLink />} />
           
          </Route>

          <Route path="/" element={<Mainpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;