import { TabList as ReakitTabList, Tab as ReakitTab, TabPanel as ReakitTabPanel, useTabState } from "reakit/Tab";
import styled, { css } from "styled-components";
import { withFocusVisibleAttr, focusStyles } from "./FocusVisible";
import colors from "../../constants/colors";
import Color from "color";
import { Button } from "reakit/Button";

export const TabList = styled(ReakitTabList)`
    min-height: 48px;

    display: flex;
    align-items: stretch;
    > * {
        flex-basis: 0;
        flex-grow: 1;
    }
`;

const tab = withFocusVisibleAttr(ReakitTab);
export const Tab = styled(tab)`
    color: ${colors.white};
    background: transparent;
    border: none;
    outline: none;
    padding: 0.5em;
    text-transform: uppercase;
    position: relative;
    border-bottom: 2px solid transparent;

    &[aria-disabled] {
        font-weight: bold;
        color: ${colors.primary_dark};
    }

    &[aria-selected=true] {
        border-bottom: 2px solid ${colors.accent};
    }

    &:hover {
        cursor: pointer;
    }

    ${focusStyles(css`
        box-shadow: inset 0 0 100vh 1px ${Color(colors.accent).alpha(0.15).toString()};
        transition: box-shadow 160ms ease-in;
    `)}
`;

const tabPanel = withFocusVisibleAttr(ReakitTabPanel);
export const TabPanel = styled(tabPanel)`
    outline: 1px dotted ${colors.offwhite};
    outline-offset: -7px;
`;

export const NavButton = styled(Button)`
    background: none;
    border: none;
    color: ${colors.white};
    
    svg {
        stroke: none;
        fill: ${colors.offwhite};
    }
`;