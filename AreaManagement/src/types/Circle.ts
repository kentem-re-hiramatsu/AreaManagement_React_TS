import { shapeType } from './Shape';

export type circleType = shapeType & {
    baseLength: number;
};
