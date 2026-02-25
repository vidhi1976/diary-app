import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';

function App() {
  // We'll add this back later. For now, let's just test the styles.
  // const { isAuthenticated } = useContext(AuthContext);

  // This is a temporary setup to see our login page and test the styles.
  // We will uncomment the real logic once the pages are built.
  return (
    <div className="bg-cream min-h-screen font-sans text-coffee font-mate">
      {/* For now, just render the LoginPage to see if styles work */}
      <Routes>
        
        {/* <Route path="/login" element={ <LoginPage />} /> */}
        <Route path="/" element={ <LoginPage />} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard' element = {<DashboardPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

