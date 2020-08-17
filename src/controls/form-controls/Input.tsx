import styled from "styled-components";
import colors from "../../constants/colors";
import { focusStyles } from "../FocusVisible";

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