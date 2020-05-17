import { 
    TabList as ReakitTabList, 
    Tab as ReakitTab, 
    TabPanel as ReakitTabPanel,

    MenuButton as ReakitMenuButton, Menu, MenuItem,

    Button,
} from "reakit";
import styled, { css } from "styled-components";
import { withFocusVisibleAttr, focusStyles, defaultFocusStyle } from "./FocusVisible";
import colors from "../../constants/colors";
import Color from "color";

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
    border: 3px solid transparent;

    &[aria-disabled] {
        color: ${colors.black};
    }

    &[aria-selected=true] {
        border-bottom: 3px solid ${colors.accent};
    }

    &:hover {
        cursor: pointer;
    }

    ${focusStyles(css`
        font-weight: bold;
        box-shadow: inset 0px -2px 3px black;
    `)}
`;

const tabPanel = withFocusVisibleAttr(ReakitTabPanel);
export const TabPanel = styled(tabPanel)`
    ${focusStyles(css`
        box-shadow: inset 0 0 5px 0px ${colors.accent};
    `)}
`;

const button = withFocusVisibleAttr(Button);
export const NavButton = styled(button)`
    background: none;
    border: none;
    color: ${colors.white};
    cursor: pointer;
    
    svg {
        stroke: none;
        fill: ${colors.offwhite};
    }

    ${focusStyles(css`
        font-weight: bold;
        box-shadow: inset 0px -2px 3px black;
        svg {
            fill: ${colors.offwhite};
            stroke: ${colors.offwhite};
        }
    `)}
`;

const navButton = withFocusVisibleAttr(ReakitMenuButton);
export const NavMenuButton = NavButton.withComponent(navButton);

export const NavBar = styled.nav`
    background: ${colors.primary};
    box-shadow: 0 0 10px black;
    max-width: inherit;
    width: 100%;
    border: 1px solid ${colors.primary_dark};


    display: flex;
    flex-direction: row;
    align-items: stretch;
    
    ${TabList} {
        flex-grow: 1;
    }
`;


export const NavMenu = styled(Menu)`
    background: ${colors.white};
    border: 1px solid grey;
    box-shadow: 0 0 -2px 5px ${colors.black};
    border-radius: 4px;
    z-index: 10;
    padding: 1px 0;
    
    &>* {
        padding: 0.5rem;
    }

    &>hr {
        padding: 0;
        margin: 1px;
    }
    
    &>small {
        display: inline-block;
    }
`;

const menuItem = withFocusVisibleAttr(MenuItem)
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

export const NavLabel = styled.small`
    color: ${Color(colors.black).alpha(0.5).toString()};
`;