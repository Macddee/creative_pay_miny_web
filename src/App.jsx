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
import Empcompany from './components/employees_page/company/Empcompany';
import Taxinfo from './components/employees_page/Taxinfo';
import Banking from './components/employees_page/Banking';
import Indicators from './components/employees_page/Indicators';
import Amounts from './components/employees_page/Amounts';
import Dates from './components/employees_page/Dates';
import Reference from './components/employees_page/Reference';
import TopSubNav from './components/TopSubNav';

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
           
              <Route path="" element={<TopSubNav />} />
              {/* <Route path="/employees/contact-details" element={<Empdetails />} /> */}
              <Route path="company" element={<Empcompany />} />
              <Route path="tax-information" element={<Taxinfo />} />
              <Route path="banking" element={<Banking />} />
              <Route path="indicators" element={<Indicators />} />
              <Route path="dates" element={<Dates />} />
              <Route path="references" element={<Reference />} />
              <Route path="amounts" element={<Amounts />} /> 
           
          </Route>

          

          <Route path="/" element={<Mainpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;