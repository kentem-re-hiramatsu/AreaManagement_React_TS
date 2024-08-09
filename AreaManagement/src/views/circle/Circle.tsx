
type propsType = {
    handleBChange: (newBaseLength: number) => void;
}

export const Circle: React.FC<propsType> = ({ handleBChange }) => {
    const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBaseLength = Number(e.target.value);
        handleBChange(newBaseLength);
    };

    return (
        <label>
            半径
            <input type="number" onChange={handleBaseChange} />
        </label>
    );
}