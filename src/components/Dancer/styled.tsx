import styled from 'styled-components';

export const StyledCircle = styled.circle`
    stroke-width: 1;
    stroke: ${({ theme }): string => theme.colors.primary};
    fill: ${({ theme }): string => theme.colors.primary};
    cursor: pointer;
    &.former-shadow {
        stroke-dasharray: 4;
        opacity: 0.5;
        fill: rgba(0, 0, 0, 0);
    }
`;

export const StyledLine = styled.line`
    stroke-width: 2;
    stroke-dasharray: 20;
    opacity: 0.5;
    stroke: ${({ theme }): string => theme.colors.white};
`;
