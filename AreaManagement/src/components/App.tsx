import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { shapeType } from '../types/Shape';
import { Add } from './Add';
import { Change } from './Change';
import { Home } from './Home';

import '../styles/App.css';

export const AreaContext = createContext(
    {} as {
        shapeData: shapeType[];
        setShapeData: Dispatch<SetStateAction<shapeType[]>>;
    }
);

function App() {
    const [shapeData, setShapeData] = useState<shapeType[]>([]);

    return (
        <Router>
            <AreaContext.Provider value={{ shapeData, setShapeData }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/change/:id" element={<Change />} />
                </Routes>
            </AreaContext.Provider>
        </Router>
    );
}

export default App;
