import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Market from './pages/Market';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Market />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
