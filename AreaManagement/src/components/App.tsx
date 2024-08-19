import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AreaProvider } from '../provider/areaProvider.tsx';
import '../styles/App.css';
import { Add } from "./Add";
import { Change } from './Change';
import { Home } from './Home';

function App() {
  return (
    <AreaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/change/:id" element={<Change />} />
        </Routes>
      </Router>
    </AreaProvider>

  )
}

export default App
