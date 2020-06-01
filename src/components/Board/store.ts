import { action, observable, computed } from 'mobx';
import { RootStore } from '../../helpers/storeProvider';

interface Properties {
    width?: number;
    height?: number;
    scale?: number;
    squareSize?: number;
    xOffset?: number;
    yOffset?: number;
}

interface Coords {
    x: number;
    y: number;
}

export default class BoardStore {
    root: RootStore;

    @observable
    width = 7;

    @observable
    height = 7;

    @observable
    scale = 100;

    @observable
    squareSize = 70;

    @observable
    xOffset = 0;

    @observable
    yOffset = 0;

    @observable
    x = 0;

    @observable
    y = 0;

    constructor(root: RootStore) {
        this.root = root;
    }

    @action
    changeDimensions = ({
        width = this.width,
        height = this.height,
        scale = this.scale,
        squareSize = this.squareSize,
        xOffset = this.xOffset,
        yOffset = this.yOffset,
    }: Properties): void => {
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.squareSize = squareSize;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    };

    @action
    changeCoords = (x: number, y: number): void => {
        const coordX = x - this.xOffset;
        const coordY = y - this.yOffset;
        this.x = coordX;
        this.y = coordY;
    };

    @computed
    get scaledWidth(): number {
        return this.width * this.scale;
    }

    @computed
    get scaledHeight(): number {
        return this.width * this.scale;
    }

    @computed
    get coords(): Coords {
        return { x: this.x, y: this.y };
    }

    @computed
    get roundedCoords(): Coords {
        const roundedX = Math.round(this.x / this.squareSize) * this.squareSize;
        const roundedY = Math.round(this.y / this.squareSize) * this.squareSize;
        return { x: roundedX, y: roundedY };
    }
}
