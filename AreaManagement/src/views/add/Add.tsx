import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/add/add.css';
import { areaType } from '../../types/AreaType';
import { circleType } from '../../types/Circle';
import { quadrilareaType } from '../../types/Quadrilarea';
import { triangleType } from '../../types/TraiangleType';
import { trapezoidType } from '../../types/Trapezoid';
import { AreaContext } from '../areaContext/areaProvider';
import { Circle } from '../circle/Circle';
import { Header } from '../header/Header';
import { Quadrilarea } from '../quadrilarea/Quadrilarea';
import { Trapezoid } from '../trapezoid/Trapezoid';
import { Triangle } from '../triangle/Triangle';

export const Add = () => {
    const context = useContext(AreaContext);
    const navigate = useNavigate();

    const [shapeName, setShapeName] = useState<string>("三角形");
    const [baseLength, setBaseLength] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [upperBaseLength, setUpperBaseLength] = useState<number>(0);

    const { shapeData, setShapeData } = context!;

    const handleBChange = (newBaseLength: number) => {
        setBaseLength(newBaseLength);
    };

    const handleBHChange = (newBaseLength: number, newHeight: number) => {
        setBaseLength(newBaseLength);
        setHeight(newHeight);
    };

    const handleBHUChange = (newBaseLength: number, newHeight: number, newUpperBaseLength: number) => {
        setBaseLength(newBaseLength);
        setHeight(newHeight);
        setUpperBaseLength(newUpperBaseLength);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = uuidv4();
        let shape: areaType;

        switch (shapeName) {
            case "三角形":
                shape = {
                    id: id,
                    shapeName: shapeName,
                    area: baseLength * height / 2,
                    baseLength: baseLength,
                    height: height,
                } as triangleType;
                break;
            case "四角形":
                shape = {
                    id: id,
                    shapeName: shapeName,
                    area: baseLength * height,
                    baseLength: baseLength,
                    height: height,
                } as quadrilareaType;
                break;
            case "台形":
                shape = {
                    id: id,
                    shapeName: shapeName,
                    area: (upperBaseLength + baseLength) * height,
                    baseLength: baseLength,
                    upperBaseLength: upperBaseLength,
                    heigth: height,
                } as trapezoidType;
                break;
            case "円":
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
                        <input type="radio" name='shape' value="三角形" checked={shapeName === '三角形'} onChange={(e) => setShapeName(e.target.value)} />
                        三角形
                    </label>
                    <label>
                        <input type="radio" name='shape' value="四角形" checked={shapeName === '四角形'} onChange={(e) => setShapeName(e.target.value)} />
                        四角形
                    </label>
                    <label>
                        <input type="radio" name='shape' value="台形" checked={shapeName === '台形'} onChange={(e) => setShapeName(e.target.value)} />
                        台形
                    </label>
                    <label>
                        <input type="radio" name='shape' value="円" checked={shapeName === '円'} onChange={(e) => setShapeName(e.target.value)} />
                        円
                    </label>
                </section>

                {shapeName === '三角形' && <Triangle handleBHChange={handleBHChange} />}

                {shapeName === '四角形' && <Quadrilarea handleBHChange={handleBHChange} />}

                {shapeName === '台形' && <Trapezoid handleBHUChange={handleBHUChange} />}

                {shapeName === '円' && <Circle handleBChange={handleBChange} />}

                <section>
                    <button type="submit">決定</button>
                </section>
            </form>
        </>
    )
}