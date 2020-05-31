import { ToolType } from '../Toolbar/types';

export type BoardProps = {
    tool: ToolType;
    width?: number;
    height?: number;
    scale?: number;
    squareSize?: number;
};

export interface BoardContainerInterface {
    width: number;
    height: number;
}

export interface Coords {
    x: number;
    y: number;
    xOffset: number;
    yOffset: number;
}
export interface DancerInterface {
    coordX: number;
    coordY: number;
}

export interface DancerMap {
    [key: string]: DancerInterface;
}
