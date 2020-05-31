import React, { useState, useRef, useEffect } from 'react';
import { BoardContainer } from './styled';
import { ToolType } from '../Toolbar/types';
import { useStore } from '../../helpers/useStore';
import { observer } from 'mobx-react';
import Dancer from '../Dancer';

interface Coords {
    x: number;
    y: number;
}

const Board: React.FC = observer(() => {
    const store = useStore();
    const [entered, setEntered] = useState<boolean>(false);
    const [coords, setCoords] = useState<Coords>({
        x: 0,
        y: 0,
    });

    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current != null) {
            const rect = svgRef.current.getBoundingClientRect();
            const { left, top } = rect;
            store.board.changeDimensions({ xOffset: left, yOffset: top });
        }
    });

    const { x, y } = coords;

    function updateCoords(event: React.MouseEvent): void {
        const { clientX, clientY } = event;
        const { xOffset, yOffset } = store.board;
        if (entered) {
            const coordX = clientX - xOffset;
            const coordY = clientY - yOffset;
            setCoords((value) => {
                return { ...value, x: coordX, y: coordY };
            });
        }
    }

    function handleClick() {
        if (entered) {
            const squareSize = store.board.squareSize;
            const coordX = Math.round(x / squareSize) * squareSize;
            const coordY = Math.round(y / squareSize) * squareSize;
            switch (store.tools.selected) {
                case ToolType.Add:
                    store.addDancer(coordX, coordY);
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
        setCoords((value) => {
            return { ...value, x: 0, y: 0 };
        });
        setEntered(false);
    }

    function renderHoverCircle() {
        if (!entered) {
            return null;
        }
        switch (store.tools.selected) {
            case ToolType.Add:
                return (
                    <circle
                        onClick={handleClick}
                        className="hover-circle"
                        cx={store.board.roundedX(x)}
                        cy={store.board.roundedY(y)}
                        r="7"
                    />
                );
            default:
                return null;
        }
    }

    return (
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
    );
});

export default Board;
