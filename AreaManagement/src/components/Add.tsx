import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { shapeNames } from '../consts/ShapeName';
import { AreaContext } from '../provider/areaProvider';
import '../styles/add/add.css';
import { circleType } from '../types/circle';
import { quadrilareaType } from '../types/quadrilarea';
import { shapeType } from '../types/shape';
import { triangleType } from '../types/traiangle';
import { trapezoidType } from '../types/trapezoid';
import { Header } from './Header';

export const Add = () => {
    const navigate = useNavigate();

    const [shapeName, setShapeName] = useState<string>(shapeNames.triangle);
    const [baseLength, setBaseLength] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [upperBaseLength, setUpperBaseLength] = useState<number>(0);

    const { shapeData, setShapeData } = useContext(AreaContext)!;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = uuidv4();
        let shape: shapeType;

        switch (shapeName) {
            case shapeNames.triangle:
                shape = {
                    id: id,
                    shapeName: shapeName,
                    area: baseLength * height / 2,
                    baseLength: baseLength,
                    height: height,
                } as triangleType;
                break;
            case shapeNames.quadrilarea:
                shape = {
                    id: id,
                    shapeName: shapeName,
                    area: baseLength * height,
                    baseLength: baseLength,
                    height: height,
                } as quadrilareaType;
                break;
            case shapeNames.trapezoid:
                shape = {
                    id: id,
                    shapeName: shapeName,
                    area: (upperBaseLength + baseLength) * height,
                    baseLength: baseLength,
                    upperBaseLength: upperBaseLength,
                    heigth: height,
                } as trapezoidType;
                break;
            case shapeNames.circle:
                shape = {
                    id: id,
                    shapeName: shapeName,
                    area: baseLength * baseLength * 3.14,
                    baseLength: baseLength,
                } as circleType;
                break;
            default: shape = {
                id: "",
                shapeName: "",
                area: 0,
            }
        }
        setShapeData([...shapeData, shape]);
        navigate('/');
    }

    return (
        <>
            <Header />
            <h1>Add</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <label>
                        <input type="radio" name='shape' value={shapeNames.triangle} checked={shapeName === shapeNames.triangle} onChange={(e) => setShapeName(e.target.value)} />
                        {shapeNames.triangle}
                    </label>
                    <label>
                        <input type="radio" name='shape' value={shapeNames.quadrilarea} checked={shapeName === shapeNames.quadrilarea} onChange={(e) => setShapeName(e.target.value)} />
                        {shapeNames.quadrilarea}
                    </label>
                    <label>
                        <input type="radio" name='shape' value={shapeNames.trapezoid} checked={shapeName === shapeNames.trapezoid} onChange={(e) => setShapeName(e.target.value)} />
                        {shapeNames.trapezoid}
                    </label>
                    <label>
                        <input type="radio" name='shape' value={shapeNames.circle} checked={shapeName === shapeNames.circle} onChange={(e) => setShapeName(e.target.value)} />
                        {shapeNames.circle}
                    </label>
                </section>



                <section>
                    <button type="submit">決定</button>
                </section>
            </form>
        </>
    )
}