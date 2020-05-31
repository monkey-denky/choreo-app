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
            dancer.setSelected(true);
            store.board.setSelected(dancer);
        }
    }

    function renderContent() {
        if (store.board.tool === ToolType.Transition) {
            // TODO add order number of Transition

            if (store.board.selected) {
                const start = store.board.selected.path[0];
                const end = store.board.coords;
                return (
                    <>
                        <circle className="former-shadow" cx={start.x} cy={start.y} r="10" />
                        <line strokeDasharray="4" x1={start.x} y1={start.y} x2={end.x} y2={end.y}></line>;
                        <circle onClick={handleClick} onMouseDown={onMouseDown} cx={end.x} cy={end.y} r="10" />
                    </>
                );
            } else if (dancer.path.length > 1) {
                const lastIndex = dancer.path.length - 1;
                const start = dancer.path[lastIndex - 1];
                const end = dancer.path[lastIndex];
                return (
                    <>
                        <circle className="former-shadow" cx={start.x} cy={start.y} r="10" />
                        <line strokeDasharray="4" x1={start.x} y1={start.y} x2={end.x} y2={end.y}></line>;
                        <circle onClick={handleClick} onMouseDown={onMouseDown} cx={end.x} cy={end.y} r="10" />
                    </>
                );
            }
        }

        return <circle onClick={handleClick} onMouseDown={onMouseDown} cx={dancer.x} cy={dancer.y} r="10" />;
    }

    return useObserver(() => renderContent());
};

export default Dancer;
