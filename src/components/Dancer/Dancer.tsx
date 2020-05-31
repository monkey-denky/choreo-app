import React from 'react';
import { ToolType } from '../Toolbar/types';
import DancerClass from './store';
import { useStore } from '../../helpers/useStore';
import { useObserver } from 'mobx-react-lite';

type DancerProps = {
    dancer: DancerClass;
};

const Dancer: React.FC<DancerProps> = ({ dancer }) => {
    const store = useStore();

    function handleClick() {
        switch (store.tools.selected) {
            case ToolType.Remove:
                store.removeDancer(dancer.id);
                break;
            default:
                return;
        }
    }

    function onMouseDown(event: React.MouseEvent) {
        if (store.tools.selected === ToolType.Default) {
            event.preventDefault();
            event.stopPropagation();
            store.board.setSelected(dancer);
        }
    }

    function onMouseUp(event: React.MouseEvent) {
        if (store.board.selected) {
            event.stopPropagation();
            event.preventDefault();
            store.board.setSelected(null);
            const { x, y } = store.board.roundedCoords;
            dancer.changeCoords(x, y);
        }
    }

    return useObserver(() => (
        <circle
            onClick={handleClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            cx={dancer.x}
            cy={dancer.y}
            r="10"
        />
    ));
};

export default Dancer;
