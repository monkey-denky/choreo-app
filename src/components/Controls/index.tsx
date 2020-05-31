import React from 'react';
import { Play } from '@styled-icons/fa-solid/Play';
import {} from '@styled-icons/fa-solid/StepBackward';
import { StepBackward } from '@styled-icons/fa-solid/StepBackward';
import { StepForward } from '@styled-icons/fa-solid/StepForward';
import { ControlsContainer } from './styled';
// import { ControlsProps } from './declarations';

const Controls: React.FC = ({}) => {
    return (
        <ControlsContainer>
            <StepBackward size="1.6em"></StepBackward>
            <Play size="1.6em"></Play>
            <StepForward size="1.6em"></StepForward>
        </ControlsContainer>
    );
};

export default Controls;
