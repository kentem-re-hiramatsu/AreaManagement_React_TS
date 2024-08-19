import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shapeNames } from "../consts/ShapeName";
import { AreaContext } from '../provider/areaProvider';
import { circleType } from "../types/circle";
import { quadrilareaType } from "../types/quadrilarea";
import { triangleType } from "../types/traiangle";
import { trapezoidType } from "../types/trapezoid";
import { Circle } from "./Circle";
import { Header } from "./Header";
import { Quadrilarea } from "./Quadrilarea";
import { Trapezoid } from "./Trapezoid";
import { Triangle } from "./Triangle";

export const Change = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const context = useContext(AreaContext);
    const { shapeData } = context!;
    const shape = shapeData.find(shape => shape.id === id);

    const [baseLength, setBaseLength] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [upperBaseLength, setUpperBaseLength] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (shape!.shapeName) {
            case shapeNames.triangle:
                const triangle = shape as triangleType;
                triangle.baseLength = baseLength;
                triangle.height = height;
                triangle.area = baseLength * height / 2;
                break;
            case shapeNames.quadrilarea:
                const quadrilarea = shape as quadrilareaType;
                quadrilarea.baseLength = baseLength;
                quadrilarea.height = height;
                quadrilarea.area = baseLength * height
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
                circle.area = baseLength * baseLength * 3.14;
                break;
            default: break;
        }
        navigate('/');
    };

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

    return (
        <>
            <Header />
            <h1>Change{shape!.shapeName}</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <label>
                        <input type="radio" name='shape' value={shapeNames.triangle} checked={shape!.shapeName === shapeNames.triangle} />
                        {shapeNames.triangle}
                    </label>
                    <label>
                        <input type="radio" name='shape' value={shapeNames.quadrilarea} checked={shape!.shapeName === shapeNames.quadrilarea} />
                        {shapeNames.quadrilarea}
                    </label>
                    <label>
                        <input type="radio" name='shape' value={shapeNames.trapezoid} checked={shape!.shapeName === shapeNames.trapezoid} />
                        {shapeNames.trapezoid}
                    </label>
                    <label>
                        <input type="radio" name='shape' value={shapeNames.circle} checked={shape!.shapeName === shapeNames.circle} />
                        {shapeNames.circle}
                    </label>
                </section>
                {shape!.shapeName === shapeNames.triangle && <Triangle handleBHChange={handleBHChange} />}

                {shape!.shapeName === shapeNames.quadrilarea && <Quadrilarea handleBHChange={handleBHChange} />}

                {shape!.shapeName === shapeNames.trapezoid && <Trapezoid handleBHUChange={handleBHUChange} />}

                {shape!.shapeName === shapeNames.circle && <Circle handleBChange={handleBChange} />}
                <section>
                    <button type="submit">決定</button>
                </section>
            </form>
        </>
    )
}