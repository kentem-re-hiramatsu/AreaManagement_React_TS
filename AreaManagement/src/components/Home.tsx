import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AreaContext } from '../components/App';
import { shapeType } from '../types/Shape';
import { Header } from './Header';

import '../styles/Home.css';

export const ShapeContext = createContext<{ shapeValue: shapeType }>;

export const Home = () => {
    const navigate = useNavigate();

    const { shapeData, setShapeData } = useContext(AreaContext)!;

    useEffect(() => {
        localStorage.setItem('shapeData', JSON.stringify(shapeData));
    }, [shapeData]);

    const handleChangeClick = (id: string) => {
        navigate(`/change/${id}`);
    };

    const handleRemoveClick = (id: string) => {
        setShapeData(shapeData.filter((shape) => shape.id !== id));
    };

    return (
        <>
            <Header />
            <h1>home</h1>
            <table>
                <thead>
                    <tr>
                        <th>図形名称</th>
                        <th>面積</th>
                        <th>変更</th>
                        <th>削除</th>
                    </tr>
                </thead>
                <tbody>
                    {(shapeData ?? []).map((value) => {
                        return (
                            <tr key={value.id}>
                                <th>{value.shapeName}</th>
                                <th>{value.area}</th>
                                <th>
                                    <button onClick={() => handleChangeClick(value.id)}>変更</button>
                                </th>
                                <th>
                                    <button onClick={() => handleRemoveClick(value.id)}>削除</button>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
