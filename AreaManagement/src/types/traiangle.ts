import { shapeType } from './shape';

export type triangleType = shapeType & {
    baseLength: number;
    height: number;
};
