import { shapeType } from './ShapeType';

export type AreaContextType = {
    shapeData: shapeType[];
    setShapeData: React.Dispatch<React.SetStateAction<shapeType[]>>;
};
