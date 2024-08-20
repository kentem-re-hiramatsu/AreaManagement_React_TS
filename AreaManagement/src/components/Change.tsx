import { ReactElement, useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AreaContext } from '../components/App';
import { shapeNames } from '../consts/ShapeName';
import { circleType } from '../types/Circle';
import { quadrilareaType } from '../types/Quadrilarea';
import { shapeType } from '../types/Shape';
import { triangleType } from '../types/Traiangle';
import { trapezoidType } from '../types/Trapezoid';
import { Header } from './Header';

export const Change = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { shapeData, setShapeData } = useContext(AreaContext)!;

    const coppyData: shapeType[] = [...shapeData];
    const shape = coppyData.find((shape) => shape.id === id);

    let inputBaseLength = useRef<HTMLInputElement>(null);
    let inputHeight = useRef<HTMLInputElement>(null);
    let inputUpperBase = useRef<HTMLInputElement>(null);

    const onChangeBaseLength = (inputNum: React.RefObject<HTMLInputElement>) => {
        inputBaseLength = inputNum;
    };

    const onChangeHeight = (inputNum: React.RefObject<HTMLInputElement>) => {
        inputHeight = inputNum;
    };

    const onChangeUpperBase = (inputNum: React.RefObject<HTMLInputElement>) => {
        inputUpperBase = inputNum;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const baseLength: number = inputBaseLength.current ? parseInt(inputBaseLength.current.value) : 0;
        const height: number = inputHeight.current ? parseInt(inputHeight.current.value) : 0;
        const upperBaseLength: number = inputUpperBase.current ? parseInt(inputUpperBase.current.value) : 0;

        switch (shape!.shapeName) {
            case shapeNames.triangle:
                const triangle = shape as triangleType;
                triangle.baseLength = baseLength;
                triangle.height = height;
                triangle.area = (baseLength * height) / 2;
                break;
            case shapeNames.quadrilarea:
                const quadrilarea = shape as quadrilareaType;
                quadrilarea.baseLength = baseLength;
                quadrilarea.height = height;
                quadrilarea.area = baseLength * height;
                break;
            case shapeNames.trapezoid:
                const trapezoid = shape as trapezoidType;
                trapezoid.baseLength = baseLength;
                trapezoid.heigth = height;
                trapezoid.upperBaseLength = upperBaseLength;
                trapezoid.area = (upperBaseLength + baseLength) * height;
                break;
            case shapeNames.circle:
                const circle = shape as circleType;
                circle.baseLength = baseLength;
                circle.area = Math.round(baseLength * baseLength * Math.PI * 100) / 100;
                break;
            default:
                break;
        }
        setShapeData([...coppyData]);
        setTimeout(() => {
            navigate('/');
        }, 100);
    };

    const shapeRadio = (name: string): ReactElement => {
        return (
            <label>
                <input type="radio" name="shape" value={name} checked={shape!.shapeName === name} />
                {name}
            </label>
        );
    };

    const inputTriangle = (): ReactElement => {
        useEffect(() => {
            inputBaseLength.current!.value = (shape as triangleType).baseLength.toString();
            inputHeight.current!.value = (shape as triangleType).height.toString();
        }, []);
        return (
            <>
                <label>
                    底辺
                    <input
                        ref={inputBaseLength}
                        type="number"
                        min={0}
                        value={inputBaseLength.current?.value}
                        onChange={() => onChangeBaseLength(inputBaseLength)}
                    />
                </label>
                <label>
                    高さ
                    <input
                        ref={inputHeight}
                        type="number"
                        min={0}
                        value={inputHeight.current?.value}
                        onChange={() => onChangeHeight(inputHeight)}
                    />
                </label>
            </>
        );
    };

    const inputQuadrilarea = (): ReactElement => {
        useEffect(() => {
            inputBaseLength.current!.value = (shape as quadrilareaType).baseLength.toString();
            inputHeight.current!.value = (shape as quadrilareaType).height.toString();
        }, []);
        return (
            <>
                <label>
                    幅
                    <input
                        ref={inputBaseLength}
                        type="number"
                        min={0}
                        value={inputBaseLength.current?.value}
                        onChange={() => onChangeBaseLength(inputBaseLength)}
                    />
                </label>
                <label>
                    高さ
                    <input
                        ref={inputHeight}
                        type="number"
                        min={0}
                        value={inputHeight.current?.value}
                        onChange={() => onChangeHeight(inputHeight)}
                    />
                </label>
            </>
        );
    };

    const inputTrapezoid = (): ReactElement => {
        useEffect(() => {
            inputUpperBase.current!.value = (shape as trapezoidType).upperBaseLength.toString();
            inputBaseLength.current!.value = (shape as trapezoidType).baseLength.toString();
            inputHeight.current!.value = (shape as trapezoidType).heigth.toString();
        }, []);
        return (
            <>
                <label>
                    上底
                    <input
                        ref={inputUpperBase}
                        type="number"
                        min={0}
                        value={inputUpperBase.current?.value}
                        onChange={() => onChangeUpperBase(inputUpperBase)}
                    />
                </label>
                <label>
                    下底
                    <input
                        ref={inputBaseLength}
                        type="number"
                        min={0}
                        value={inputBaseLength.current?.value}
                        onChange={() => onChangeBaseLength(inputBaseLength)}
                    />
                </label>
                <label>
                    高さ
                    <input
                        ref={inputHeight}
                        type="number"
                        min={0}
                        value={inputHeight.current?.value}
                        onChange={() => onChangeHeight(inputHeight)}
                    />
                </label>
            </>
        );
    };

    const inputCircle = (): ReactElement => {
        useEffect(() => {
            inputBaseLength.current!.value = (shape as circleType).baseLength.toString();
        }, []);
        return (
            <>
                <label>
                    半径
                    <input
                        ref={inputBaseLength}
                        type="number"
                        min={0}
                        value={inputBaseLength.current?.value}
                        onChange={() => onChangeBaseLength(inputBaseLength)}
                    />
                </label>
            </>
        );
    };

    return (
        <>
            <Header />
            <h1>Change</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    {shapeRadio(shapeNames.triangle)}
                    {shapeRadio(shapeNames.quadrilarea)}
                    {shapeRadio(shapeNames.trapezoid)}
                    {shapeRadio(shapeNames.circle)}
                </section>
                {shape!.shapeName === shapeNames.triangle && inputTriangle()}
                {shape!.shapeName === shapeNames.quadrilarea && inputQuadrilarea()}
                {shape!.shapeName === shapeNames.trapezoid && inputTrapezoid()}
                {shape!.shapeName === shapeNames.circle && inputCircle()}
                <section>
                    <button type="submit">決定</button>
                </section>
            </form>
        </>
    );
};
