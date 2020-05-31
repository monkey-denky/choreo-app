import React from 'react';
import { ToolType } from '../../helpers/enums';
import DancerClass from './store';
import { useStore } from '../../helpers/useStore';
import { useObserver } from 'mobx-react-lite';
import { StyledLine, StyledCircle } from './styled';

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

            if (store.board.selected === dancer) {
                const start = store.board.selected.path[0];
                const end = store.board.coords;
                return (
                    <>
                        <StyledCircle className="former-shadow" cx={start.x} cy={start.y} r="10" />
                        <StyledLine x1={start.x} y1={start.y} x2={end.x} y2={end.y} />
                        <StyledCircle onClick={handleClick} onMouseDown={onMouseDown} cx={end.x} cy={end.y} r="10" />
                    </>
                );
            }
            if (dancer.path.length > 1) {
                const lastIndex = dancer.path.length - 1;
                const start = dancer.path[lastIndex - 1];
                const end = dancer.path[lastIndex];
                return (
                    <>
                        <StyledCircle className="former-shadow" cx={start.x} cy={start.y} r="10" />
                        <StyledLine x1={start.x} y1={start.y} x2={end.x} y2={end.y} />
                        <StyledCircle onClick={handleClick} onMouseDown={onMouseDown} cx={end.x} cy={end.y} r="10" />
                    </>
                );
            }
            return <StyledCircle onClick={handleClick} onMouseDown={onMouseDown} cx={dancer.x} cy={dancer.y} r="10" />;
        }

        return <StyledCircle onClick={handleClick} onMouseDown={onMouseDown} cx={dancer.x} cy={dancer.y} r="10" />;
    }

    return useObserver(() => renderContent());
};

export default Dancer;
