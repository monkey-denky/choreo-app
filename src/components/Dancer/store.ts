import { action, observable } from 'mobx';
import { Store as Root } from '../../helpers/storeProvider';

function getId(x: number, y: number): number {
    return ((x + y) * (x + y + 1)) / 2 + x;
}

interface Coords {
    x: number;
    y: number;
}

export default class Store {
    root: Root;
    id: number;

    @observable x = 0;
    @observable y = 0;
    @observable path: Coords[] = [];
    @observable selected = false;

    constructor(root: Root, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.id = getId(x, y);
        this.root = root;
        this.addPath(x, y);
    }

    @action
    changeCoords = (x: number, y: number): void => {
        this.x = x;
        this.y = y;
    };

    @action
    addPath = (x: number, y: number): void => {
        const index = this.root.frames.length;
        const pathLenght = this.path.length;
        if (index === pathLenght || pathLenght === 0) {
            this.path.push({ x, y });
        } else if (index < pathLenght) {
            this.path[index] = { x, y };
        }
    };

    @action
    setSelected = (selected: boolean): void => {
        this.selected = selected;
    };
}
