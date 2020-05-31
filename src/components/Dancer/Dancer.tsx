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
        switch (store.board.tool) {
            case ToolType.Remove:
                store.removeDancer(dancer.id);
                break;
            default:
                return;
        }
    }

    function onMouseDown(event: React.MouseEvent) {
        if (store.board.tool === ToolType.Default || store.board.tool === ToolType.Transition) {
            event.preventDefault();
            event.stopPropagation();
            store.board.setSelected(dancer);
        }
    }

    function renderPath() {
        if (store.board.tool === ToolType.Transition && store.board.selected) {
            // TODO add order number of Transition
            const start = store.board.selected.path[0];
            const end = store.board.coords;
            return <line strokeDasharray="4" x1={start.x} y1={start.y} x2={end.x} y2={end.y}></line>;
        }
    }

    return useObserver(() => (
        <>
            {renderPath()}
            <circle onClick={handleClick} onMouseDown={onMouseDown} cx={dancer.x} cy={dancer.y} r="10" />
        </>
    ));
};

export default Dancer;
