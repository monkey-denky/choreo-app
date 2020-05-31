import { createContext } from 'react';
import { store as Board } from '../components/Board';
import { store as Dancer } from '../components/Dancer';
import { store as Toolbar } from '../components/Toolbar';

import { action } from 'mobx';

interface DancerMap {
    [key: string]: Dancer;
}

function getId(x: number, y: number): number {
    return ((x + y) * (x + y + 1)) / 2 + x;
}

export class Store {
    dancers: DancerMap = {};
    board: Board = new Board();
    tools: Toolbar = new Toolbar();

    @action
    addDancer = (x: number, y: number): void => {
        const id = getId(x, y);
        if (!this.dancers[id]) {
            this.dancers[id] = new Dancer(x, y);
        }
    };

    @action
    removeDancer = (id: number): void => {
        if (this.dancers[id]) {
            delete this.dancers[id];
        }
    };
}

export const StoreContext = createContext<Store>({} as Store);
export const StoreProvider = StoreContext.Provider;
