import { ShapeType } from './enums/ShapeType';

export interface Node {
    pulsePhase: number;
    shape: ShapeType;
    opacity: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
    x: number;
    y: number;
}
