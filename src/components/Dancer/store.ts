import { action, observable } from 'mobx';

function getId(x: number, y: number): number {
    return ((x + y) * (x + y + 1)) / 2 + x;
}

export default class Store {
    id: number;

    @observable x = 0;
    @observable y = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.id = getId(x, y);
    }

    @action
    changeCoords = (x: number, y: number): void => {
        this.x = x;
        this.y = y;
    };
}
