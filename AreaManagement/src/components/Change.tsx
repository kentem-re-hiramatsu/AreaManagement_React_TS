import { ReactElement, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shapeNames } from "../consts/ShapeName";
import { AreaContext } from '../provider/areaProvider';
import { circleType } from "../types/circle";
import { quadrilareaType } from "../types/quadrilarea";
import { triangleType } from "../types/traiangle";
import { trapezoidType } from "../types/trapezoid";
import { Header } from "./Header";

export const Change = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { shapeData } = useContext(AreaContext)!;
    const shape = shapeData.find(shape => shape.id === id);

    const inputBaseLength = useRef<HTMLInputElement>(null);
    const inputHeight = useRef<HTMLInputElement>(null);
    const inputUpperBase = useRef<HTMLInputElement>(null);

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
                circle.area = Math.round((baseLength * baseLength * Math.PI) * 100) / 100;
                break;
            default: break;
        }
        navigate('/');
    };

    const shapeRadio = (name: string): ReactElement => {
        return (
            <label>
                <input type="radio" name='shape' value={name} checked={shape!.shapeName === name} />
                {name}
            </label>
        )
    }

    return (
        <>
            <Header />
            <h1>Change{shape!.shapeName}</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    {shapeRadio(shapeNames.triangle)}
                    {shapeRadio(shapeNames.quadrilarea)}
                    {shapeRadio(shapeNames.trapezoid)}
                    {shapeRadio(shapeNames.circle)}
                </section>
                {shape!.shapeName === shapeNames.triangle && <>
                    <label>
                        底辺
                        <input ref={inputBaseLength} type="number" min={0} placeholder={`${(shape as triangleType).baseLength}`} />
                    </label>
                    <label>
                        高さ
                        <input ref={inputHeight} type="number" min={0} placeholder={`${(shape as triangleType).height}`} />
                    </label>
                </>
                }

                {shape!.shapeName === shapeNames.quadrilarea && <>
                    <label>
                        幅
                        <input ref={inputBaseLength} type="number" min={0} placeholder={`${(shape as quadrilareaType).baseLength}`} />
                    </label>
                    <label>
                        高さ
                        <input ref={inputHeight} type="number" min={0} placeholder={`${(shape as quadrilareaType).height}`} />
                    </label>
                </>
                }

                {shape!.shapeName === shapeNames.trapezoid && <>
                    <label >
                        上底
                        <input ref={inputUpperBase} type="number" min={0} placeholder={`${(shape as trapezoidType).upperBaseLength}`} />
                    </label>
                    <label>
                        下底
                        <input ref={inputBaseLength} type="number" min={0} placeholder={`${(shape as trapezoidType).baseLength}`} />
                    </label>
                    <label>
                        高さ
                        <input ref={inputHeight} type="number" min={0} placeholder={`${(shape as trapezoidType).heigth}`} />
                    </label>
                </>
                }

                {shape!.shapeName === shapeNames.circle && <>
                    <label>
                        半径
                        <input ref={inputBaseLength} type="number" min={0} placeholder={`${(shape as circleType).baseLength}`} />
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