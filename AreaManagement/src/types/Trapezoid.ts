import { shapeType } from './shape';

export type trapezoidType = shapeType & {
    baseLength: number;
    upperBaseLength: number;
    heigth: number;
};
