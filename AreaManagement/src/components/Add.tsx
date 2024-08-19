import { useContext, useRef, useState } from 'react';
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
            case shapeNames.triangle:
                shape = {
                    id: id,
                    shapeName: shapeName,
                    area: baseLength * baseLength / 2,
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
                {
                    shapeName === shapeNames.triangle &&
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
                }
                {
                    shapeName === shapeNames.quadrilarea &&
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
                }
                {
                    shapeName === shapeNames.trapezoid &&
                    <>
                        <label >
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
                }
                {
                    shapeName === shapeNames.circle &&
                    <>
                        <label>
                            半径
                            <input ref={inputBaseLength} type="number" min={0} />
                        </label>
                    </>
                }
                <section>
                    <button type="submit">決定</button>
                </section>
            </form>
        </>
    )
}