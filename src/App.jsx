import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar'
import Employees from './pages/Employees'
import Utilities from './pages/Utilities';
import Reports from './pages/Reports';
import Processes from './pages/Processes';
import TransactionsHome from './pages/TransactionsHome';
import TransactionTopNav from './components/transactions_page/TransactionTopNav';
import Taxinfo from './components/employees_page/Taxinfo';
import Banking from './components/employees_page/Banking';
import Indicators from './components/employees_page/Indicators';
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
import Footer from './components/home/Footer';
import { DataProvider } from './ContextProviders/DataContexts';
import Register from './auth/Register';
import AdminNav from './components/admin_page/AdminNav';
import Admin from './components/admin_page/Admin';
import AdditionalSettings from './components/AdditionalSettings';

function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-white text-black">
      <AuthProvider>
        <Router>

          <main className="flex-grow">
            <DataProvider>
              <Navbar />
              <Routes className="relative">
                <Route path="/utilities" element={<Utilities />} />
                <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/processes" element={<Processes />} />
                <Route path="/adminstrators" element={<RequireAuth><AdminNav /></RequireAuth>} />
                <Route path="/additional-settings" element={<RequireAuth><AdditionalSettings /></RequireAuth>} />
                <Route path="/transactions" element={<RequireAuth><TransactionsHome /></RequireAuth>}>
                  <Route path="" element={<TransactionTopNav />} />
                  <Route path="view-batches" element={<ViewBatches />} />
                </Route>
                <Route path="/employees" element={<RequireAuth><Employees /></RequireAuth>}>
                  <Route path="" element={<EmpNav />} />
                  <Route path="company" element={<CompanyNav />} />
                  <Route path="tax-information" element={<Taxinfo />} />
                  <Route path="banking" element={<Banking />} />
                  <Route path="indicators" element={<Indicators />} />
                  <Route path="dates" element={<Dates />} />
                  <Route path="references" element={<Reference />} />
                  <Route path="amounts" element={<AmountsNav />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/" element={<RequireAuth> <Navigate to="/employees" /> </RequireAuth>} />
              </Routes>
            </DataProvider>
          </main>
          {/* <div className='h-20 bg-red-500 fixed bottom'></div> */}
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;