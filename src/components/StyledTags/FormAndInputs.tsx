import styled from "styled-components";
import { Button as ReakitButton } from "reakit";
import colors from "../../constants/colors";
import { withFocusVisibleAttr, focusStyles } from "./FocusVisible";

export const Input = styled.input`
    &[type=text], &:not([type]) {
        outline: none;
        border: none;
        box-shadow: none;
        border-bottom: 2px solid ${colors.primary_light};
        border-bottom-color: ${colors.primary_light};
        background: transparent;
        border-radius: 0;

        font-size: inherit;
        font-weight: 600;

        margin: 5em 0 2em 0;
        padding: 0.5em 1ch;
        color: inherit;

        label+& {
            margin: 0.5em 0 2em 0;
        }

        ${focusStyles()}
    }
`;

const button = withFocusVisibleAttr(ReakitButton);
export const Button = styled(button)<{primary?: boolean}>`
    background: ${props => props.primary ? colors.primary : colors.primary_washed};
    color: ${props => props.primary ? colors.white : colors.black};
    border: 2px solid ${props => props.primary ? colors.primary_dark : colors.primary_light};
    border-radius: 50px;
    padding: 0.3em 0.5em;
    cursor: pointer;
    font-size: inherit;
    display: flex;
    justify-content: center;
    
    svg {
        margin-left: 20px;
    }

    ${focusStyles()}
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
