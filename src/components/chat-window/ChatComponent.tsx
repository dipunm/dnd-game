import React, { useEffect, useRef, useLayoutEffect } from "react";
import { useObservable } from "react-use";
import { Button } from "../../controls/form-controls/Button";
import { IoIosArrowForward } from "react-icons/io";
import { ChatMessage, Container, MessagePanel, Spacer, UserName, ChatBar, MessageInput } from "./ChatComponents";
import ChatObservable from "./ChatObservable";
import useChatInputBehaviour from "./useChatInputBehaviour";
import NotificationObservable from "./NotificationObservable";
import TabObservable from "../../layouts/TabObservable";
import { scrollToBottomUponNewMessage } from "./ScrollToBottomUponNewMessage";

type ChatProps = {
    messageNotification: (message: Message) => void,
};

export function ChatComponent({messageNotification} : ChatProps) {
    const messages = useObservable(ChatObservable, []);
    const currentNotificationMessage = useObservable(NotificationObservable, null);
    const activeTab = useObservable(TabObservable, null);
    const { inputProps, onFormSubmit } = useChatInputBehaviour({
        submitHandler: value => {
            NotificationObservable.sendMessage();
            ChatObservable.sendMessage(value);
    }});

    const messagePanelRef = useRef<HTMLDivElement>(null);
    const oldScrollHeightRef = useRef(messagePanelRef.current?.scrollHeight ?? 0);
    
    // When you switch to the Chat tab
    useEffect(() => {
        if (activeTab === 'Chat')
        {
            oldScrollHeightRef.current = messagePanelRef.current?.scrollHeight ?? 0; // Set the reference scroll height (so it doesn't initially think it's 0)
            messagePanelRef.current?.scrollTo(0, messagePanelRef.current?.scrollHeight); // Scroll to the bottom
        }
    },[activeTab]);

    useEffect(() => {
            if (currentNotificationMessage != null)
            {
                messageNotification(currentNotificationMessage); // Trigger a notification, and provide the last sent message

            }
    },[currentNotificationMessage, messageNotification]);

    useLayoutEffect(() => {
        scrollToBottomUponNewMessage(messagePanelRef.current, oldScrollHeightRef.current);
        oldScrollHeightRef.current = messagePanelRef.current?.scrollHeight ?? 0; // Have to update this variable outside of the function
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
            <MessagePanel ref={messagePanelRef}>
                <Spacer grow={true} />
                {messages.map(({ handle, message }, i) => (
                    <ChatMessage key={i} fromThisUser={handle === ChatObservable.username}>
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