import styled from 'styled-components';
// import { ControlsContainerInterface } from './declarations';

export const ControlsContainer = styled.div`
    display: flex;
    svg {
        margin: 1rem;
        color: ${({ theme }): string => theme.colors.lightGray};
        transition: ${({ theme }): string => theme.transitions.default};
        &:hover {
            color: ${({ theme }): string => theme.colors.white};
            cursor: pointer;
        }
    }
`;
