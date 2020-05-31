import React from 'react';
import { ToolType } from '../Toolbar/types';
import DancerClass from './store';
import { useStore } from '../../helpers/useStore';
import { observer } from 'mobx-react';

type DancerProps = {
    dancer: DancerClass;
};

const Dancer: React.FC<DancerProps> = observer(({ dancer }) => {
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

    // onMouseDown={mouseDown}
    // onMouseUp={mouseUp}
    // onMouseMove={mouseMove}
    // onMouseLeave={mouseLeave}
    return <circle onClick={handleClick} cx={dancer.x} cy={dancer.y} r="10" />;
});

export default Dancer;
