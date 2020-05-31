import React, { useState, useRef, useEffect } from 'react';
import { BoardContainer } from './styled';
import { ToolType } from '../../helpers/enums';
import { useStore } from '../../helpers/useStore';
import { useObserver } from 'mobx-react-lite';
import Dancer from '../Dancer';
import BoardClass from './store';

type BoardProps = {
    board: BoardClass;
};

const Board: React.FC<BoardProps> = ({ board }) => {
    const store = useStore();
    const [entered, setEntered] = useState<boolean>(false);

    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current != null) {
            const rect = svgRef.current.getBoundingClientRect();
            const { left, top } = rect;
            board.changeDimensions({ xOffset: left, yOffset: top });
        }
    }, [board]);

    function onMouseMove(event: React.MouseEvent): void {
        const { clientX, clientY } = event;
        event.stopPropagation();
        event.preventDefault();
        if (entered) {
            board.changeCoords(clientX, clientY);
        }
    }

    function onMouseUp(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        if (store.selectedDancer) {
            const { x, y } = store.board.roundedCoords;
            store.selectedDancer.changeCoords(x, y);
            if (store.tools.selected === ToolType.Transition) {
                store.selectedDancer.addPath(x, y);
                store.selectedDancer.setSelected(false);
            }
        }
    }

    function handleClick() {
        if (entered) {
            const { x, y } = board.roundedCoords;
            switch (store.tools.selected) {
                case ToolType.Add:
                    store.addDancer(x, y);
                    break;
                default:
                    return;
            }
        }
    }

    function mouseEnter() {
        setEntered(true);
    }

    function mouseLeave() {
        setEntered(false);
    }

    function renderHoverCircle() {
        if (!entered) {
            return null;
        }
        const { x, y } = board.roundedCoords;
        switch (store.tools.selected) {
            case ToolType.Add:
                return <circle onClick={handleClick} className="hover-circle" cx={x} cy={y} r="10" />;
            default:
                return null;
        }
    }

    return useObserver(() => (
        <BoardContainer width={board.scaledWidth} height={board.scaledHeight}>
            <svg
                ref={svgRef}
                onMouseUp={onMouseUp}
                onMouseEnter={mouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={mouseLeave}
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="grid" width={board.squareSize} height={board.squareSize} patternUnits="userSpaceOnUse">
                        <rect width={board.squareSize} height={board.squareSize} />
                        <path
                            className="grid"
                            d={`M ${board.squareSize} 0 L 0 0 0 ${board.squareSize}`}
                            fill="none"
                            stroke="gray"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {Object.entries(store.dancers).map(([key, dancer]) => (
                    <Dancer key={key} dancer={dancer} />
                ))}
                {renderHoverCircle()}
            </svg>
        </BoardContainer>
    ));
};

export default Board;
