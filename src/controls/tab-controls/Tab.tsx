import styled, { css } from "styled-components";
import { Tab as ReakitTab } from 'reakit';
import { withFocusVisibleAttr, focusStyles } from "../FocusVisible";
import colors from "../../constants/colors";

const tab = withFocusVisibleAttr(ReakitTab);
export const Tab = styled(tab)`
    color: ${colors.white};
    background: transparent;
    border: none;
    outline: none;
    padding: 0.5em;
    text-transform: uppercase;
    position: relative;
    font-weight: bold;
    /*border: 3px solid transparent;*/

    &[aria-disabled] {
        color: ${colors.black};
    }

    &[aria-selected=true] {
        border-bottom: 5px solid ${colors.accent};
    }

    &:hover {
        cursor: pointer;
    }

    /*${focusStyles(css`
        font-weight: bold;
        box-shadow: inset 0px -2px 3px black;
    `)}*/
    ${focusStyles(css`
        box-shadow: inset 0 -4px 3px -3px ${colors.outline};
    `)}  
`;