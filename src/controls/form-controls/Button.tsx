import { Button as ReakitButton } from 'reakit';
import { withFocusVisibleAttr, focusStyles } from "../FocusVisible";
import styled from "styled-components";
import colors from '../../constants/colors';

const button = withFocusVisibleAttr(ReakitButton);
export const Button = styled(button)<{primary?: boolean}>`
    background: ${props => props.primary ? colors.primary : colors.primary_verylight};
    /*color: ${props => props.primary ? colors.white : colors.black};*/
    /*border: 2px solid ${props => props.primary ? colors.primary : colors.primary_washed};*/
    border-width: 0px;
    border-radius: 50px;
    padding: 0.3em 0.5em;
    cursor: pointer;
    font-size: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    font-family: 'Segoe UI';
    font-weight: 600;
    
    svg {
        margin-left: 1ch;
    }

    ${focusStyles()}
`;
