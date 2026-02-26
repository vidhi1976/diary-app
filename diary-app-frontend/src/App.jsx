import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div className="bg-cream min-h-screen font-sans text-coffee font-mate">
      
      <Routes>
          <Route path="/login" element={ <LoginPage />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={ <DashboardPage/>} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;

