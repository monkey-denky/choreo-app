import styled from 'styled-components';
import { ToolbarContainerInterface } from './types';

export const ToolbarContainer = styled.div<ToolbarContainerInterface>`
    position: absolute;
    top: 0;
    right: -4rem;
    display: flex;
    flex-direction: column;
    svg {
        margin: 1rem;
        color: ${({ theme }): string => theme.colors.lightGray};
        transition: ${({ theme }): string => theme.transitions.default};
        &:hover {
            color: ${({ theme }): string => theme.colors.white};
            cursor: pointer;
        }
        &:nth-child(${({ selected }): number => selected}) {
            color: ${({ theme }): string => theme.colors.primary};
        }
    }
    .submenu-wrap {
        display: flex;
    }
    .submenu {
        overflow: hidden;
        display: flex;
        transition: ${({ theme }): string => theme.transitions.default};
        max-width: ${({ transition }): number => (transition ? 200 : 0)}px;
    }
`;
