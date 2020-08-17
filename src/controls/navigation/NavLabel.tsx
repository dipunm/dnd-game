import colors from "../../constants/colors";
import styled from "styled-components";
import Color from "color";

export const NavLabel = styled.small`
    color: ${Color(colors.black).alpha(0.5).toString()};
`;