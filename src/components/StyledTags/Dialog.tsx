import styled from "styled-components";
import { Dialog as ReakitDialog, DialogBackdrop as ReakitDialogBackdrop } from "reakit";
import colors from "../../constants/colors";
import Color from "color";

export const Dialog = styled(ReakitDialog)`
    background: ${colors.primary_washed};
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    padding: 10px 20px;
`;

export const DialogBackdrop = styled(ReakitDialogBackdrop)`
    background: ${Color(colors.black).alpha(0.5).toString()};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;
`;