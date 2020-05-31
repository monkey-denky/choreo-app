import { action, observable } from 'mobx';

function getId(x: number, y: number): number {
    return ((x + y) * (x + y + 1)) / 2 + x;
}

interface Coords {
    x: number;
    y: number;
}

export default class Store {
    id: number;

    @observable x = 0;
    @observable y = 0;
    @observable path: Coords[] = [];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.id = getId(x, y);
        this.addPath(x, y);
    }

    @action
    changeCoords = (x: number, y: number): void => {
        this.x = x;
        this.y = y;
    };

    @action
    addPath = (x: number, y: number): void => {
        this.path.push({ x, y });
    };
}
