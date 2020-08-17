import { withFocusVisibleAttr, focusStyles } from "../FocusVisible";
import styled, { css } from "styled-components";
import colors from "../../constants/colors";
import { TabPanel as ReakitTabPanel } from 'reakit';

const tabPanel = withFocusVisibleAttr(ReakitTabPanel);
export const TabPanel = styled(tabPanel)`
    overflow: auto;
    ${focusStyles(css`
        box-shadow: inset 0 0 5px 0px ${colors.accent};
    `)} 
`;