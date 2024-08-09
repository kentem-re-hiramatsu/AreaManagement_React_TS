import { shapeType } from './ShapeType';

export type trapezoidType = shapeType & {
    baseLength: number;
    upperBaseLength: number;
    heigth: number;
};
