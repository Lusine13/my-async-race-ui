import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Garage from './pages/GaragePage';
import Winners from './pages/WinnersPage';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="nav-tabs">
        <NavLink
          to="/garage"
          className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
        >
          Garage
        </NavLink>
        <span className="divider">|</span>
        <NavLink
          to="/winners"
          className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
        >
          Winners
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/garage" replace />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </Router>
  );
}

export default App;
