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
                {messages.map(({ message }) => (
                    <div className="Chatbox-entry bubble">
                        {/* <h2 className="Chatbox-entry-handle">{handle}</h2> */}
                        <p style={{whiteSpace: 'pre-line'}}>{message}</p>
                    </div>
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