import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../styles/App.css';
import { Add } from "./add/Add.tsx";
import { AreaProvider } from './areaContext/areaProvider.tsx';
import { Change } from './change/Change.tsx';
import { Home } from './home/Home';

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
