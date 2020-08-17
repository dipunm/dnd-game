import { withFocusVisibleAttr, focusStyles } from "../FocusVisible";
import styled, { css } from "styled-components";
import colors from "../../constants/colors";
import Color from "color";
import { MenuItem as ReakitMenuItem } from "reakit";

const menuItem = withFocusVisibleAttr(ReakitMenuItem)
export const NavMenuItem = styled(menuItem)`
    display: block;
    font-size: 1em;
    background: none;
    width: 100%;
    border: none;
    cursor: pointer;
    
    ${focusStyles(css`
        background: ${colors.grey};
        border-top: 1px solid ${Color(colors.grey).darken(0.2).toString()};
        border-bottom: 1px solid ${Color(colors.grey).darken(0.2).toString()};
    `)}
    
    &:hover {
        background: ${colors.grey};
    }
`;