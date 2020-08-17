import styled from "styled-components";
import colors from "../../constants/colors";
import { Menu as ReakitMenu } from "reakit";

export const NavMenu = styled(ReakitMenu)`
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