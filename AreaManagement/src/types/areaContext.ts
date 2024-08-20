import { shapeType } from './Shape';

export type areaContextType = {
    shapeData: shapeType[];
    setShapeData: React.Dispatch<React.SetStateAction<shapeType[]>>;
};
