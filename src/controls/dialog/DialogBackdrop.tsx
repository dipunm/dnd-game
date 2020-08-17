import styled from "styled-components";
import colors from "../../constants/colors";
import Color from "color";
import { DialogBackdrop as ReakitDialogBackdrop } from "reakit";

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