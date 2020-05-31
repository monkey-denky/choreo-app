import { action, observable } from 'mobx';

interface Properties {
    width?: number;
    height?: number;
    scale?: number;
    squareSize?: number;
    xOffset?: number;
    yOffset?: number;
}

export default class Store {
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

    get scaledWidth(): number {
        return this.width * this.scale;
    }

    get scaledHeight(): number {
        return this.width * this.scale;
    }
}
