import React, { useState, useRef, useEffect } from 'react';
import { BoardContainer } from './styled';
import { ToolType } from '../../helpers/enums';
import { useStore } from '../../helpers/useStore';
import { useObserver } from 'mobx-react-lite';
import Dancer from '../Dancer';
import BoardClass from './store';
import { store as DancerStore } from '../Dancer';

type BoardProps = {
    board: BoardClass;
};

const Board: React.FC<BoardProps> = ({ board }) => {
    const store = useStore();

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
        if (store.selectedDancer) {
            event.stopPropagation();
            event.preventDefault();
        }
        board.changeCoords(clientX, clientY);
    }

    function onMouseUp(event: React.MouseEvent) {
        if (store.selectedDancer) {
            event.stopPropagation();
            event.preventDefault();
            const { x, y } = store.board.roundedCoords;
            store.selectedDancer.changeCoords(x, y);
            if (store.tools.selected === ToolType.Transition) {
                store.selectedDancer.addPath(x, y);
            }
            store.selectedDancer.setSelected(false);
        }
    }

    function onClick(event: React.MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        store.tools.preciseClick();
    }

    function renderHoverCircle() {
        const { x, y } = board.roundedCoords;
        switch (store.tools.selected) {
            case ToolType.Add:
                return <circle onClick={onClick} className="hover-circle" cx={x} cy={y} r="7" />;
            default:
                return null;
        }
    }

    return useObserver(() => (
        <BoardContainer width={board.scaledWidth} height={board.scaledHeight}>
            <svg
                ref={svgRef}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
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
                {Object.entries<DancerStore>(store.dancers).map(([key, dancer]) => (
                    <Dancer key={key} dancer={dancer} />
                ))}
                {renderHoverCircle()}
            </svg>
        </BoardContainer>
    ));
};

export default Board;
