import styled from "styled-components";
import colors from "../constants/colors";
import { ChatMessage } from "../components/chat-window/ChatComponents";

/*export const Toast = styled.div<{visibility: Boolean}>`
  visibility: ${props => props.visibility ? "visible" : "hidden"};
  position: absolute;
  bottom: 0.3em;
  align-self: center;
  background: ${colors.primary_verylight};
  border-radius: 50px;
  padding: 0.3em 0.5em;
  font-family: 'Segoe UI';
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 20em; /* need to fix this so it is a consistent percentage of the overall width of the screen*/

  export const Toast = styled(ChatMessage)<{visibility: boolean}>`
      visibility: ${props => props.visibility ? "visible" : "hidden"};
      position: absolute;
      bottom: 1%;
      width: 80%;

      p {
        /* Currently, multilines aren't working properly (a little bit of the next line can be seen) */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
      }
  `;