import { shapeType } from './shape';

export type areaContextType = {
    shapeData: shapeType[];
    setShapeData: React.Dispatch<React.SetStateAction<shapeType[]>>;
};
