import styled from "styled-components";
import colors from "../../constants/colors";
import TextareaAutoSize from 'react-textarea-autosize';
import { focusStyles } from "../../controls/FocusVisible";
import React from "react";

export const MyTextareaAutoSize = React.forwardRef<HTMLTextAreaElement>((props, ref) => {
    return (
        <TextareaAutoSize {...props} inputRef={ref || undefined} />
    );
});

export const ChatMessage = styled.div<{ fromThisUser: boolean }>`

    text-align: left;
    /* border: #333 1px solid; */
    /* border-radius: 10px; */
    border-radius: .4em;
    background-color: ${props => props.fromThisUser ? colors.primary_chatbox_1 : colors.primary_chatbox_2};
    margin: ${props => props.fromThisUser ? "2% 4% 2% 12%" : "2% 12% 2% 4%" };
    /*padding: 8px 10px 5px 10px; */
    padding: 1.8% 2% 1% 2%;

    /* the tail of the speech bubble */
    ::before {
        content: '';
        position: relative;
        border: 20px solid transparent;
        border-top-color: ${props => props.fromThisUser ? colors.primary_chatbox_1 : colors.primary_chatbox_2};
        ${props => props.fromThisUser ? "float: right; border-left: 0; margin-right: -1.4em;" : "float: left; border-right: 0; margin-left: -1.4em;"}
    }

    p {
        position: absolute;
        overflow: visible;
        overflow-wrap: break-word;
        white-space: pre-line;
        position: relative;
        font-size: 0.9rem;
        margin: 0;
        padding: 5px 0;
    }
`;

export const MessageInput = styled(MyTextareaAutoSize)`
    resize: none;
    flex-grow: 1;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.1rem;
    padding: 0.4rem;
    max-height: 4.4rem;
    min-height: 100%;
    box-sizing: border-box;
    border-width: 0px; /*override*/
    border-radius: 10px;

    ${focusStyles()}
    :focus {
        outline-width: 0px; /*override*/
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${colors.primary_washed};
`;

export const MessagePanel = styled.div`
    flex-grow: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;

`;

export const ChatBar = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 10px;

    button {
        margin-left: 10px;
        min-height: 48px;
    }
    svg {
        margin-left: 4px;
        font-size: 1.3rem;
    }
`;

export const Spacer = styled.div<{ grow: boolean }>`
    flex-grow: ${props => props.grow ? 1 : 0};
    padding: 1px;
`;

export const UserName = styled.h2`
    font-size: 0.9rem;
    margin: 0;
`;