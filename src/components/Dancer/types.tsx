export interface DancerContainerInterface {
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
