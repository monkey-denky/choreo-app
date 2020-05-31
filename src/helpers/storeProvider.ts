import { createContext } from 'react';
import { store as Board } from '../components/Board';
import { store as Dancer } from '../components/Dancer';
import { store as Toolbar } from '../components/Toolbar';

import { action, observable, computed } from 'mobx';

interface DancerMap {
    [key: string]: Dancer;
}

function getId(x: number, y: number): number {
    return ((x + y) * (x + y + 1)) / 2 + x;
}

export class Store {
    dancers: DancerMap = {};
    board: Board = new Board(this);
    tools: Toolbar = new Toolbar();
    @observable
    frames: number[] = [1];

    @action
    addDancer = (x: number, y: number): void => {
        const id = getId(x, y);
        if (!this.dancers[id]) {
            this.dancers[id] = new Dancer(this, x, y);
        }
    };

    @action
    removeDancer = (id: number): void => {
        if (this.dancers[id]) {
            delete this.dancers[id];
        }
    };

    @computed
    get selectedDancer(): Dancer | null {
        const result = Object.values(this.dancers).find((dancer) => dancer.selected);
        if (result === undefined) {
            return null;
        }
        return result;
    }

    @action
    addFrame = (): void => {
        this.frames.push(1);
    };
}

export const StoreContext = createContext<Store>({} as Store);
export const StoreProvider = StoreContext.Provider;
