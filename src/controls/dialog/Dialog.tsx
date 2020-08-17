import colors from "../../constants/colors";
import styled from "styled-components";
import { Dialog as ReakitDialog } from "reakit";

export const Dialog = styled(ReakitDialog)`
    background: ${colors.primary_washed};
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    padding: 10px 20px;
`;
