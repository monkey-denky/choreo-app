import styled from 'styled-components';
interface BoardContainerInterface {
    width: number;
    height: number;
}

export const BoardContainer = styled.div<BoardContainerInterface>`
    width: ${({ width }): number => width}px;
    height: ${({ height }): number => height}px;
    svg {
        border: 1px solid ${({ theme }): string => theme.colors.white};
        fill: rgba(0, 0, 0, 0);
        .hover-circle {
            stroke-width: 1;
            stroke: ${({ theme }): string => theme.colors.white};
            fill: ${({ theme }): string => theme.colors.white};
            opacity: 0.4;
            transition: ${({ theme }): string => theme.transitions.default};
            transition-property: opacity;
            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
    }
    path.grid {
        stroke: ${({ theme }): string => theme.colors.gray};
    }
`;
