import { ToolType } from './types';
import { action, observable } from 'mobx';

export default class Store {
    @observable
    selected = ToolType.Add;

    @action
    changeSelected = (selected: ToolType): void => {
        this.selected = selected;
    };
}
