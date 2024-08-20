import { ReactElement, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { AreaContext } from '../components/App';
import { shapeNames } from '../consts/ShapeName';
import { circleType } from '../types/Circle';
import { quadrilareaType } from '../types/Quadrilarea';
import { shapeType } from '../types/Shape';
import { ShapeName } from '../types/ShapeNames';
import { triangleType } from '../types/Traiangle';
import { trapezoidType } from '../types/Trapezoid';
import { Header } from './Header';

import '../styles/Add.css';

export const Add = () => {
    const navigate = useNavigate();

    const [shapeName, setShapeName] = useState<ShapeName>('triangle');

    const inputBaseLength = useRef<HTMLInputElement>(null);
    const inputHeight = useRef<HTMLInputElement>(null);
    const inputUpperBase = useRef<HTMLInputElement>(null);

    const { shapeData, setShapeData } = useContext(AreaContext)!;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = uuidv4();
        let shape: shapeType;

        const baseLength: number = inputBaseLength.current ? parseInt(inputBaseLength.current.value) : 0;
        const height: number = inputHeight.current ? parseInt(inputHeight.current.value) : 0;
        const upperBaseLength: number = inputUpperBase.current ? parseInt(inputUpperBase.current.value) : 0;

        switch (shapeName) {
            case 'triangle':
                shape = {
                    id: id,
                    shapeName: shapeNames['triangle'],
                    area: (baseLength * baseLength) / 2,
                    baseLength: baseLength,
                    height: height,
                } as triangleType;
                break;
            case 'quadrilarea':
                shape = {
                    id: id,
                    shapeName: shapeNames['quadrilarea'],
                    area: baseLength * height,
                    baseLength: baseLength,
                    height: height,
                } as quadrilareaType;
                break;
            case 'trapezoid':
                shape = {
                    id: id,
                    shapeName: shapeNames['trapezoid'],
                    area: (upperBaseLength + baseLength) * height,
                    baseLength: baseLength,
                    upperBaseLength: upperBaseLength,
                    heigth: height,
                } as trapezoidType;
                break;
            case 'circle':
                shape = {
                    id: id,
                    shapeName: shapeNames['circle'],
                    area: Math.round(baseLength * baseLength * Math.PI * 100) / 100,
                    baseLength: baseLength,
                } as circleType;
                break;
            default:
                shape = {
                    id: '',
                    shapeName: '',
                    area: 0,
                };
        }
        setShapeData([...shapeData, shape]);
        setTimeout(() => {
            navigate('/');
        }, 100);
    };

    const shapeRadio = (name: ShapeName): ReactElement => {
        return (
            <label>
                <input type="radio" name="shape" checked={name === shapeName} onChange={() => setShapeName(name)} />
                {shapeNames[name]}
            </label>
        );
    };

    const inputTriangle = (): ReactElement => {
        return (
            <>
                <label>
                    底辺
                    <input ref={inputBaseLength} type="number" min={0} />
                </label>
                <label>
                    高さ
                    <input ref={inputHeight} type="number" min={0} />
                </label>
            </>
        );
    };

    const inputQuadrilarea = (): ReactElement => {
        return (
            <>
                <label>
                    幅
                    <input ref={inputBaseLength} type="number" min={0} />
                </label>
                <label>
                    高さ
                    <input ref={inputHeight} type="number" min={0} />
                </label>
            </>
        );
    };

    const inputTrapezoid = (): ReactElement => {
        return (
            <>
                <label>
                    上底
                    <input ref={inputUpperBase} type="number" min={0} />
                </label>
                <label>
                    下底
                    <input ref={inputBaseLength} type="number" min={0} />
                </label>
                <label>
                    高さ
                    <input ref={inputHeight} type="number" min={0} />
                </label>
            </>
        );
    };

    const inputCircle = (): ReactElement => {
        return (
            <>
                <label>
                    半径
                    <input ref={inputBaseLength} type="number" min={0} />
                </label>
            </>
        );
    };
    return (
        <>
            <Header />
            <h1>Add</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    {shapeRadio('triangle')}
                    {shapeRadio('quadrilarea')}
                    {shapeRadio('trapezoid')}
                    {shapeRadio('circle')}
                </section>
                {shapeName === 'triangle' && inputTriangle()}
                {shapeName === 'quadrilarea' && inputQuadrilarea()}
                {shapeName === 'trapezoid' && inputTrapezoid()}
                {shapeName === 'circle' && inputCircle()}
                <section>
                    <button type="submit">決定</button>
                </section>
            </form>
        </>
    );
};
