import React from 'react';
import { Plus } from '@styled-icons/fa-solid/Plus';
import { Minus } from '@styled-icons/fa-solid/Minus';
import { MousePointer } from '@styled-icons/fa-solid/MousePointer';
import { TransferWithinAStation } from '@styled-icons/material/TransferWithinAStation';
// import { FlowLine } from '@styled-icons/entypo/FlowLine';
import { ToolbarContainer } from './styled';
import { ToolType } from '../../helpers/enums';
import { useObserver } from 'mobx-react-lite';
import ToolbarClass from './store';

type ToolbarProps = {
    toolbar: ToolbarClass;
};

const Toolbar: React.FC<ToolbarProps> = ({ toolbar }) => {
    function selectDefault() {
        toolbar.setSelected(ToolType.Default);
    }
    function selectAdd() {
        toolbar.setSelected(ToolType.Add);
    }
    function selectRemove() {
        toolbar.setSelected(ToolType.Remove);
    }

    function selectTransition() {
        toolbar.setSelected(ToolType.Transition);
    }

    return useObserver(() => (
        <ToolbarContainer selected={toolbar.selected}>
            <MousePointer onClick={selectDefault} size="1.6em"></MousePointer>
            <Plus onClick={selectAdd} size="1.6em"></Plus>
            <Minus onClick={selectRemove} size="1.6em"></Minus>
            <TransferWithinAStation onClick={selectTransition} size="1.6em"></TransferWithinAStation>
        </ToolbarContainer>
    ));
};

export default Toolbar;
