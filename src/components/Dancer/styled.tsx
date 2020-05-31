import styled from 'styled-components';
import { DancerContainerInterface } from './types';

export const DancerContainer = styled.div<DancerContainerInterface>`
    width: ${({ width }): number => width}px;
    height: ${({ height }): number => height}px;
    svg {
        border: 1px solid ${({ theme }): string => theme.colors.white};
        fill: rgba(0, 0, 0, 0);

        circle {
            stroke-width: 1;
            stroke: ${({ theme }): string => theme.colors.white};
            fill: ${({ theme }): string => theme.colors.white};
            cursor: pointer;
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
