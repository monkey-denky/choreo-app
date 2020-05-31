import React, { useState, useRef, useEffect } from 'react';
import { BoardContainer } from './styled';
import { ToolType } from '../Toolbar/types';
import { useStore } from '../../helpers/useStore';
import { useObserver } from 'mobx-react-lite';
import Dancer from '../Dancer';

interface Coords {
    x: number;
    y: number;
}

const Board: React.FC = () => {
    const store = useStore();
    const [entered, setEntered] = useState<boolean>(false);

    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current != null) {
            const rect = svgRef.current.getBoundingClientRect();
            const { left, top } = rect;
            store.board.changeDimensions({ xOffset: left, yOffset: top });
        }
    }, [store.board]);

    function updateCoords(event: React.MouseEvent): void {
        const { clientX, clientY } = event;
        if (entered) {
            store.board.changeCoords(clientX, clientY);
        }
    }

    function handleClick() {
        if (entered) {
            const squareSize = store.board.squareSize;
            const { x, y } = store.board.roundedCoords;
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
        const { x, y } = store.board.roundedCoords;
        switch (store.tools.selected) {
            case ToolType.Add:
                return <circle onClick={handleClick} className="hover-circle" cx={x} cy={y} r="7" />;
            default:
                return null;
        }
    }

    return useObserver(() => (
        <BoardContainer width={store.board.scaledWidth} height={store.board.scaledHeight}>
            <svg
                ref={svgRef}
                onMouseEnter={mouseEnter}
                onMouseMove={updateCoords}
                onMouseLeave={mouseLeave}
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="grid"
                        width={store.board.squareSize}
                        height={store.board.squareSize}
                        patternUnits="userSpaceOnUse"
                    >
                        <rect width={store.board.squareSize} height={store.board.squareSize} />
                        <path
                            className="grid"
                            d={`M ${store.board.squareSize} 0 L 0 0 0 ${store.board.squareSize}`}
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
