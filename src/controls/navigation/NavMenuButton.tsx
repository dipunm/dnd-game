import { MenuButton as ReakitMenuButton } from "reakit";
import styled, { css } from "styled-components";
import colors from "../../constants/colors";
import { withFocusVisibleAttr, focusStyles } from "../FocusVisible";


const menuButton = withFocusVisibleAttr(ReakitMenuButton);
export const NavMenuButton = styled(menuButton)`
    background: none;
    border: none;
    color: ${colors.white};
    cursor: pointer;
    
    svg {
        stroke: none;
        fill: ${colors.offwhite};
    }

    /*${focusStyles(css`
        font-weight: bold;
        box-shadow: inset 0px -2px 3px black;
        svg {
            fill: ${colors.offwhite};
            stroke: ${colors.offwhite};
        }
    `)}*/
    ${focusStyles(css`
        box-shadow: inset 0px -9px 3px -3px ${colors.outline};
    `)}
`;