import styled from "styled-components";
import colors from "../../constants/colors";

export const PatternedContainer = styled.div`
    color: white;
    padding: 20px 20px 0 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    background:
    linear-gradient(115deg, transparent 75%, ${colors.primary_dark} 75%) 0 0,
    linear-gradient(245deg, transparent 75%, ${colors.primary_dark} 75%) 0 0,
    linear-gradient(115deg, transparent 75%, ${colors.primary_dark} 75%) 7px -10px,
    linear-gradient(245deg, transparent 75%, ${colors.primary_dark} 75%) 7px -10px,
    ${colors.primary};
    background-size: 10px 20px;

    text-shadow: 0 0 1px ${colors.primary_washed};
`;