import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Garage from './pages/GaragePage';
import Winners from './pages/WinnersPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Garage</Link> | <Link to="/winners">Winners</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </Router>
  );
}

export default App;
