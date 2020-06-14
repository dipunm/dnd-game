import { useLayoutEffect, useRef, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import { Button } from "../StyledTags/FormAndInputs";
import { useObservable } from "react-use";
import TextareaAutoSize from 'react-textarea-autosize';
import { MdSend } from "react-icons/md";
import colors from "../../constants/colors";
import ChatObservable from "../../observables/ChatObservable";
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

const ChatMessage = styled.div<{ fromUser: String }>`

    text-align: left;
    padding: 3px 10px;
    /* border: #333 1px solid; */
    /* border-radius: 10px; */
    border-radius: .4em;
    background-color: rgb(235, 189, 183);
    margin: ${props => props.fromUser == ChatObservable.username ? "10px 20px 10px 60px" : "10px 60px 10px 20px" };
    padding: 8px 10px 5px 10px;
    
    ::after {
        content: '';
        position: relative;
        border: 20px solid transparent;
        border-top-color: rgb(235, 189, 183);
        border-left: 0;
        margin-left: 101%;
        top: -38px; /*should really be relative*/
    }

    p {
        position: absolute;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
    const { inputProps, onFormSubmit } = useChatInputBehaviour({
        submitHandler: value => ChatObservable.sendMessage(value)
    });
    const myRef = useRef<HTMLDivElement>(null);
    const oldScrollHeightRef = useRef(myRef.current?.scrollHeight ?? 0);
    
    // Temporary solution to oldScrollHeightRef not being defined until you send your first message (=0 when messages.length is updated for the first time)
    useEffect(() => {
        // Whilst the MessagePanel is undefined (I assume because the user is on a different tab), try to set the value of oldScrollHeight
        if (oldScrollHeightRef.current === 0)
        {
            if (myRef.current?.scrollHeight != null)
            {
                console.log(myRef.current?.scrollHeight);
                oldScrollHeightRef.current = myRef.current?.scrollHeight;
            }
        }
    })
    // Arguably inefficient, so I'd like to fix this at some point.
    

    useLayoutEffect(() => { // using useEffect here caused jittery behaviour, so instead, we're going to scroll before the messages are displayed on-screen
        const {scrollTop = 0, clientHeight = 0} = myRef.current ?? {}; 
        // {a, b} = c. Look for c.a and c.b and assign to vars called a,b 
        // a ?? b. If a is null, return b
        // const. constant within scope
        const scrollPosition = scrollTop + clientHeight;
        if (Math.abs(scrollPosition - oldScrollHeightRef.current) < 100) 
        {
            // Currently doesn't work first time?
            myRef.current?.scrollTo(0, myRef.current?.scrollHeight);
        }
        oldScrollHeightRef.current = myRef.current?.scrollHeight ?? 0;
    }, [messages.length]); // The dependency list indicates when the hook should be run. It essentially says "if messages.length changes, then run" which is exactly what we need

    /**
     * IDEAS/TODOS:
     * - FIX Font sizes across browsers
     * - tabindex -1 for all elements
     * - skiplinks
     * - modal mode for tabbing within messages?
     */

    return (
        <Container>
            <MessagePanel ref={myRef}>
                <Spacer grow={true} />
                {messages.map(({ handle, message }) => (
                    <ChatMessage fromUser={handle}>
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