import { shapeType } from './Shape';

export type triangleType = shapeType & {
    baseLength: number;
    height: number;
};
