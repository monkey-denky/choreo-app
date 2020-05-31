import { ToolType } from './../../helpers/enums';
import { observable, action } from 'mobx';

// import { ToolType } from './types';
// import { action, observable } from 'mobx';

export default class Store {
    @observable
    selected: ToolType = ToolType.Add;

    @action
    setSelected = (selected: ToolType): void => {
        this.selected = selected;
    };
}
