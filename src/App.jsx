import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx'
import Popular from './pages/Popular.jsx';
import Top from './pages/top rated.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/popular' element={<Popular />}></Route>
        <Route path='/top_rated' element={<Top />}></Route>
      </Routes>
    </Router>
  );
}

export default App;