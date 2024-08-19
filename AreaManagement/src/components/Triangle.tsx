import React, { useState } from "react";

type propsType = {
    handleBHChange: (newBaseLength: number, newHeight: number) => void;
}

export const Triangle: React.FC<propsType> = ({ handleBHChange }) => {
    const [baseLength, setBaseLength] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBaseLength = Number(e.target.value);
        setBaseLength(newBaseLength);
        handleBHChange(newBaseLength, height);
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = Number(e.target.value);
        setHeight(newHeight);
        handleBHChange(baseLength, newHeight);
    };

    return (
        <>
            <label>
                底辺
                <input type="number" min={0} onChange={handleBaseChange} />
            </label>
            <label>
                高さ
                <input type="number" min={0} onChange={handleHeightChange} />
            </label>
        </>
    );
}