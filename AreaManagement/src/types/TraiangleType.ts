import { shapeType } from './ShapeType';

export type triangleType = shapeType & {
    baseLength: number;
    height: number;
};
