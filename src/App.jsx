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
import TransactionsHome from './pages/TransactionsHome';
import Masterfile from './components/transactions_page/Masterfile';
import TransactionTopNav from './components/transactions_page/TransactionTopNav';
import Mainpage from './pages/Mainpage';
import Taxinfo from './components/employees_page/Taxinfo';
import Banking from './components/employees_page/Banking';
import Indicators from './components/employees_page/Indicators';
import Amounts from './components/employees_page/amounts/Amounts';
import Dates from './components/employees_page/Dates';
import Reference from './components/employees_page/Reference';
import EmpNav from './components/employees_page/employee/EmpNav';
import CompanyNav from './components/employees_page/company/CompanyNav';
import AmountsNav from './components/employees_page/amounts/AmountsNav';
import Profile from './auth/Profile';
import { AuthProvider } from './auth/auth';
import Login from './auth/Login';
import RequireAuth from './auth/RequireAuth';
import ViewBatches from './components/transactions_page/ViewBatches';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>

            <Route path="/utilities" element={<Utilities />} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/processes" element={<Processes />} />
            <Route path="/transactions" element={<TransactionsHome />}>
              <Route path="" element={<TransactionTopNav />} />
              <Route path="view-batches" element={<ViewBatches />} />
            </Route>

            <Route path="/employees" element={<Employees />}>
              <Route path="" element={<EmpNav />} />
              <Route path="company" element={<CompanyNav />} />
              <Route path="tax-information" element={<Taxinfo />} />
              <Route path="banking" element={<Banking />} />
              <Route path="indicators" element={<Indicators />} />
              <Route path="dates" element={<Dates />} />
              <Route path="references" element={<Reference />} />
              <Route path="amounts" element={<AmountsNav />} />
            </Route>

            <Route path="/" element={<Mainpage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;