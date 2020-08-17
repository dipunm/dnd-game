import React, { useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import TextareaAutoSize from 'react-textarea-autosize';
import { focusStyles } from "../../controls/FocusVisible";
import colors from "../../constants/colors";
import { useObservable } from "react-use";
import { Button } from "../../controls/form-controls/Button";
import { IoIosArrowForward } from "react-icons/io";
import ChatObservable from "./ChatObservable";
import useChatInputBehaviour from "./useChatInputBehaviour";

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
    border-width: 0px; /*override*/
    border-radius: 10px;

    ${focusStyles()}
    :focus {
        outline-width: 0px; /*override*/
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${colors.primary_washed};
`;

const MessagePanel = styled.div`
    flex-grow: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;

`;

const ChatBar = styled.div`
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
    background-color: ${props => props.fromUser === ChatObservable.username ? colors.primary_chatbox_1 : colors.primary_chatbox_2};
    margin: ${props => props.fromUser === ChatObservable.username ? "10px 20px 10px 60px" : "10px 60px 10px 20px" };
    padding: 8px 10px 5px 10px;  

    /* the tail of the speech bubble */
    ::before {
        content: '';
        position: relative;
        border: 20px solid transparent;
        border-top-color: ${props => props.fromUser === ChatObservable.username ? colors.primary_chatbox_1 : colors.primary_chatbox_2};
        ${props => props.fromUser === ChatObservable.username ? "float: right; border-left: 0; margin-right: -1.4em;" : "float: left; border-right: 0; margin-left: -1.4em;"}
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

const UserName = styled.h2`
    font-size: 0.9rem;
    margin: 0;
`;

export function ChatComponent() {
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
                <Button type="submit"><IoIosArrowForward size="32px"/></Button>
            </ChatBar>
        </Container>
    );
}