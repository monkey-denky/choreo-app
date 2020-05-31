import React from 'react';
import { Plus } from '@styled-icons/fa-solid/Plus';
import { Minus } from '@styled-icons/fa-solid/Minus';
import { MousePointer } from '@styled-icons/fa-solid/MousePointer';
import { TransferWithinAStation } from '@styled-icons/material/TransferWithinAStation';
// import { FlowLine } from '@styled-icons/entypo/FlowLine';
import { ToolbarContainer } from './styled';
import { ToolType } from './types';
import { useStore } from '../../helpers/useStore';
import { useObserver } from 'mobx-react-lite';

const Toolbar: React.FC = () => {
    const store = useStore();

    function selectDefault() {
        store.board.setTool(ToolType.Default);
    }
    function selectAdd() {
        store.board.setTool(ToolType.Add);
    }
    function selectRemove() {
        store.board.setTool(ToolType.Remove);
    }

    function selectTransition() {
        store.board.setTool(ToolType.Transition);
    }
    return useObserver(() => (
        <ToolbarContainer selected={store.board.tool}>
            <MousePointer onClick={selectDefault} size="1.6em"></MousePointer>
            <Plus onClick={selectAdd} size="1.6em"></Plus>
            <Minus onClick={selectRemove} size="1.6em"></Minus>
            <TransferWithinAStation onClick={selectTransition} size="1.6em"></TransferWithinAStation>
        </ToolbarContainer>
    ));
};

export default Toolbar;
