import { createContext } from 'react';
import { store as BoardStore } from '../components/Board';
import { store as DancerStore } from '../components/Dancer';
import { store as ToolbarStore } from '../components/Toolbar';

import { action, observable, computed } from 'mobx';

interface DancerMap {
    [key: string]: DancerStore;
}

function getId(x: number, y: number): number {
    return ((x + y) * (x + y + 1)) / 2 + x;
}

export class RootStore {
    dancers: DancerMap = {};
    board: BoardStore = new BoardStore(this);
    tools: ToolbarStore = new ToolbarStore(this);
    @observable
    frames: number[] = [1];

    @action
    addDancer = (x: number, y: number): void => {
        const id = getId(x, y);
        if (!this.dancers[id]) {
            this.dancers[id] = new DancerStore(this, x, y);
        }
    };

    @action
    removeDancer = (id: number): void => {
        if (this.dancers[id]) {
            delete this.dancers[id];
        }
    };

    @computed
    get selectedDancer(): DancerStore | null {
        const result = Object.values(this.dancers).find((dancer) => dancer.selected);
        if (result === undefined) {
            return null;
        }
        return result;
    }

    @computed
    get findDancerByCoords(): DancerStore {
        const { x, y } = this.board.roundedCoords;
        const result = Object.values(this.dancers).find((dancer) => dancer.x === x && dancer.y === y);
        if (result === undefined) {
            throw Error('No dancer found');
        }
        return result;
    }

    @action
    addFrame = (): void => {
        this.frames.push(1);
    };
}

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;
