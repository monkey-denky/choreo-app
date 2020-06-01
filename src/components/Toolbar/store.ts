import { ToolType } from './../../helpers/enums';
import { observable, action, computed, toJS } from 'mobx';
import { RootStore } from '../../helpers/storeProvider';
export default class ToolbarStore {
    root: RootStore;
    @observable
    selected: ToolType = ToolType.Add;

    constructor(root: RootStore) {
        this.root = root;
    }

    @action
    setSelected = (selected: ToolType): void => {
        this.selected = selected;
        console.dir(toJS(this.root));
    };

    @computed
    get preciseClick(): () => void {
        switch (this.selected) {
            case ToolType.Add:
                return (): void => {
                    const { x, y } = this.root.board.roundedCoords;
                    this.root.addDancer(x, y);
                };
            case ToolType.Remove:
                return (): void => {
                    try {
                        const dancer = this.root.findDancerByCoords;
                        this.root.removeDancer(dancer.id);
                    } catch (err) {
                        console.error(err);
                    }
                };
            case ToolType.Transition:
                return (): void => {
                    const { x, y } = this.root.board.roundedCoords;
                    this.root.addDancer(x, y);
                };
            default:
                return (): void => {
                    console.log('Click');
                };
        }
    }

    @computed
    get clickDancer(): () => void {
        switch (this.selected) {
            case ToolType.Remove:
                return (): void => {
                    const { x, y } = this.root.board.roundedCoords;
                    this.root.addDancer(x, y);
                };
            default:
                return (): void => {
                    console.log('Click');
                };
        }
    }
}
