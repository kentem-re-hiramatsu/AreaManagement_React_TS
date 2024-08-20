import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
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
    const [shapeData, setShapeData] = useState(() => {
        const localData = localStorage.getItem('shapeData');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('shapeData', JSON.stringify(shapeData));
    }, [shapeData]);

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
