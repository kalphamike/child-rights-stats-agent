// routes
// import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import DashboardAppPage from './pages/DashboardAppPage';
import LoginPage from './pages/LoginPage';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import DashboardLayout from './layouts/dashboard';
import CasesPage from './pages/CasesPage';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Routes>
        {localStorage.getItem('usertoken') && 
          <Route path='/' exact element={<Navigate replace to='/dashboard/app' />} />
        }
        {
          localStorage.getItem('usertoken') &&
            <Route path='/dashboard' element={<DashboardLayout/>}>
              <Route path='' element={<DashboardAppPage/>} />
              <Route path='app' element={<DashboardAppPage/>} />
              <Route path='user' element={<UserPage />} />
              <Route path='Reg' element={<ProductsPage />} />
              <Route path='cases' element={<CasesPage />} />
              <Route path='RecordCase' element={<BlogPage />} />   
            </Route>
        }          
        <Route path='/dashboard' exact element={<Navigate replace to='/login' />}/>
        <Route path='/dashboard/app' exact element={<Navigate replace to='/login' />}/>
        <Route path='/dashboard/user' exact element={<Navigate replace to='/login' />}/>
        <Route path='/dashboard/Reg' exact element={<Navigate replace to='/login' />}/>
        <Route path='/dashboard/cases' exact element={<Navigate replace to='/login' />}/>
        <Route path='/dashboard/RecordCase' exact element={<Navigate replace to='/login' />}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </ThemeProvider>
  );
}
