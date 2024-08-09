import { useState } from "react";

type propsType = {
    handleBHUChange: (newBaseLength: number, newHeight: number, newUpperBaseLength: number) => void;
}

export const Trapezoid: React.FC<propsType> = ({ handleBHUChange }) => {
    const [baseLength, setBaseLength] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [upperBaseLength, setUpperBaseLength] = useState<number>(0);

    const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBaseLength = Number(e.target.value);
        setBaseLength(newBaseLength);
        handleBHUChange(newBaseLength, height, upperBaseLength);
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = Number(e.target.value);
        setHeight(newHeight);
        handleBHUChange(baseLength, newHeight, upperBaseLength);
    };

    const handleUpperBaseLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUpperBaseLength = Number(e.target.value);
        setUpperBaseLength(newUpperBaseLength);
        handleBHUChange(baseLength, height, newUpperBaseLength);
    };

    return (
        <>
            <label>
                上底
                <input type="number" onChange={handleUpperBaseLengthChange} />
            </label>
            <label>
                下底
                <input type="number" onChange={handleBaseChange} />
            </label>
            <label>
                高さ
                <input type="number" onChange={handleHeightChange} />
            </label>
        </>
    );
}