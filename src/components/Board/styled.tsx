import styled from 'styled-components';
import { BoardContainerInterface } from './types';

export const BoardContainer = styled.div<BoardContainerInterface>`
    width: ${({ width }): number => width}px;
    height: ${({ height }): number => height}px;
    svg {
        border: 1px solid ${({ theme }): string => theme.colors.white};
        fill: rgba(0, 0, 0, 0);
        line {
            stroke-width: 2;
            stroke: ${({ theme }): string => theme.colors.white};
        }
        circle {
            stroke-width: 1;
            stroke: ${({ theme }): string => theme.colors.primary};
            fill: ${({ theme }): string => theme.colors.primary};
            cursor: pointer;
            &.former-shadow {
                stroke-dasharray: 4;
                fill: rgba(0, 0, 0, 0);
            }
            &.hover-circle {
                opacity: 0.5;
                transition: ${({ theme }): string => theme.transitions.default};
                &:hover {
                    opacity: 1;
                }
            }
        }
    }
    path.grid {
        stroke: ${({ theme }): string => theme.colors.gray};
    }
`;
