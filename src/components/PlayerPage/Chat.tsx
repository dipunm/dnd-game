import React, { useCallback } from "react";
import styled from "styled-components";
import { Button } from "../StyledTags/FormAndInputs";
import { useToggle, useObservable } from "react-use";
import TextareaAutoSize from 'react-textarea-autosize';
import { MdSend } from "react-icons/md";
import colors from "../../constants/colors";
import ChatObservable, { Message } from "../../observables/ChatObservable";
import useChatInputBehaviour from "../../lib/useChatInputBehaviour";

export const ChatTabLabel = 'Chat';

const MyTextareaAutoSize = React.forwardRef<HTMLTextAreaElement>((props, ref) => {
    return (
        <TextareaAutoSize {...props} inputRef={ref || undefined} />
    );
});

const MessageInput = styled(MyTextareaAutoSize)`
    resize: none;
    flex-grow: 1;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.1rem;
    padding: 0.4rem;
    max-height: 4.4rem;
    min-height: 100%;
    box-sizing: border-box;
    border-radius: 10px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const MessagePanel = styled.div`
    flex-grow: 1;
    overflow: auto;

    display: flex;
    flex-direction: column;

`;

const ChatBar = styled.div`
    background: ${colors.primary_dark};
    display: flex;
    align-items: flex-end;
    padding: 10px;

    button {
        margin-left: 5px;
        min-height: 48px;
    }
    svg {
        margin-left: 4px;
        font-size: 1.3rem;
    }
`;

const Spacer = styled.div<{ grow: boolean }>`
    flex-grow: ${props => props.grow ? 1 : 0};
    padding: 1px;
`;

const ChatMessage = styled.div`
    text-align: left;
    padding: 3px 10px;

    border: #333 1px solid;
    border-radius: 10px;
    background-color: rgba(61, 173, 248, 0.2);
    margin: 10px 0;
    padding: 8px 10px 5px 10px;

    p {
        position: relative;
        font-size: 0.9rem;
        margin: 0;
        padding: 5px 0;
        white-space: pre-line;
    }
`;

const UserName = styled.h2`
    font-size: 0.9rem;
    margin: 0;
`;

export default function Chat() {
    const messages = useObservable(ChatObservable, []);
    const [manyExamples, toggleExampleSize] = useToggle(false);
    const { inputProps, onFormSubmit } = useChatInputBehaviour({
        submitHandler: value => ChatObservable.sendMessage(value)
    });

    /**
     * IDEAS/TODOS:
     * - FIX Font sizes across browsers
     * - tabindex -1 for all elements
     * - skiplinks
     * - modal mode for tabbing within messages?
     */

    return (
        <Container>
            <MessagePanel>
                <Spacer grow={true} />
                {messages.map(({ handle, message }) => (
                    <ChatMessage>
                        <UserName>{handle}</UserName>
                        <p>{message}</p>
                    </ChatMessage>
                ))}
                <Spacer grow={false} />
            </MessagePanel>
            <ChatBar as={Spacer} />
            <ChatBar as="form" onSubmit={onFormSubmit}>
                <MessageInput {...inputProps} ref={inputProps['ref']} />
                <Button type="submit"><MdSend /></Button>
            </ChatBar>
        </Container>
    );
}