import { shapeType } from './Shape';

export type trapezoidType = shapeType & {
    baseLength: number;
    upperBaseLength: number;
    heigth: number;
};
