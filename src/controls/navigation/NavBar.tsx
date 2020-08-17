import styled from "styled-components";
import colors from "../../constants/colors";
import { TabList } from "../tab-controls/TabList";

export const NavBar = styled.nav`
    background: ${colors.primary};
    /*box-shadow: 0 0 10px black;*/
    max-width: inherit;
    width: 100%;
    /*border-bottom: 1px solid ${colors.primary_dark};*/


    display: flex;
    flex-direction: row;
    align-items: stretch;
    
    ${TabList} {
        flex-grow: 1;
    }
`;