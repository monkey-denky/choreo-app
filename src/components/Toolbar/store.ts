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

    // @computed
    // get preciseClick(): () => void {
    //     switch (this.selected) {
    //         case ToolType.Add:
    //             return (): void => {
    //                 const { x, y } = this.root.board.roundedCoords;
    //                 this.root.addDancer(x, y);
    //             };
    //         case ToolType.Remove:
    //             return (): void => {
    //                 try {
    //                     const dancer = this.root.findDancerByCoords;
    //                     this.root.removeDancer(dancer.id);
    //                 } catch (err) {
    //                     console.error(err);
    //                 }
    //             };
    //         default:
    //             return (): void => {
    //                 console.log('Click');
    //             };
    //     }
    // }

    @computed
    get mouseEvents(): { [key: string]: (event: React.MouseEvent) => void } {
        switch (this.selected) {
            case ToolType.Default:
            case ToolType.Transition:
                return {
                    onMouseDown: (event: React.MouseEvent): void => {
                        const id = (<SVGElement>event.target).getAttribute('data-id');
                        if (id) {
                            event.preventDefault();
                            event.stopPropagation();

                            try {
                                const dancer = this.root.dancers[id];
                                dancer.setSelected(true);
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    },
                    onMouseMove: (event: React.MouseEvent): void => {
                        const { clientX, clientY } = event;
                        this.root.board.changeCoords(clientX, clientY);
                        if (this.root.selectedDancer) {
                            event.stopPropagation();
                            event.preventDefault();
                            const { x, y } = this.root.board.coords;
                            this.root.selectedDancer.changeCoords(x, y);
                        }
                    },
                    onMouseUp: (event: React.MouseEvent): void => {
                        if (this.root.selectedDancer) {
                            event.stopPropagation();
                            event.preventDefault();
                            const { x, y } = this.root.board.roundedCoords;
                            this.root.selectedDancer.changeCoords(x, y);
                            if (this.selected === ToolType.Transition) {
                                this.root.selectedDancer.addPath(x, y);
                            }
                            this.root.selectedDancer.setSelected(false);
                        }
                    },
                };
            case ToolType.Remove: {
                return {
                    onMouseMove: (event: React.MouseEvent): void => {
                        const { clientX, clientY } = event;
                        this.root.board.changeCoords(clientX, clientY);
                    },
                    onClick: (event: React.MouseEvent): void => {
                        event.preventDefault();
                        event.stopPropagation();
                        try {
                            const dancer = this.root.findDancerByCoords;
                            this.root.removeDancer(dancer.id);
                        } catch (err) {
                            console.error(err);
                        }
                    },
                };
            }

            case ToolType.Add: {
                return {
                    onMouseMove: (event: React.MouseEvent): void => {
                        const { clientX, clientY } = event;
                        this.root.board.changeCoords(clientX, clientY);
                    },
                    onClick: (event: React.MouseEvent): void => {
                        event.preventDefault();
                        event.stopPropagation();
                        const { x, y } = this.root.board.roundedCoords;
                        this.root.addDancer(x, y);
                    },
                };
            }
            default:
                return {
                    onMouseMove: (event: React.MouseEvent): void => {
                        const { clientX, clientY } = event;
                        this.root.board.changeCoords(clientX, clientY);
                    },
                };
        }
    }
}
