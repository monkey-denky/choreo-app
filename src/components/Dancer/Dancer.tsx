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

    function renderContent() {
        if (store.tools.selected === ToolType.Transition) {
            // TODO add order number of Transition

            if (dancer.selected) {
                const start = dancer.path[0];
                const end = dancer.coords;
                return (
                    <>
                        <StyledCircle className="former-shadow" cx={start.x} cy={start.y} r="10" />
                        <StyledLine x1={start.x} y1={start.y} x2={end.x} y2={end.y} />
                        <StyledCircle
                            data-id={dancer.id}
                            onClick={store.tools.mouseEvents.onClick}
                            cx={end.x}
                            cy={end.y}
                            r="10"
                        />
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
                        <StyledCircle
                            data-id={dancer.id}
                            onClick={store.tools.mouseEvents.onClick}
                            cx={end.x}
                            cy={end.y}
                            r="10"
                        />
                    </>
                );
            }
            return (
                <StyledCircle
                    data-id={dancer.id}
                    onClick={store.tools.mouseEvents.onClick}
                    cx={dancer.x}
                    cy={dancer.y}
                    r="10"
                />
            );
        }

        return (
            <StyledCircle
                data-id={dancer.id}
                onClick={store.tools.mouseEvents.onClick}
                cx={dancer.x}
                cy={dancer.y}
                r="10"
            />
        );
    }

    return useObserver(() => renderContent());
};

export default Dancer;
