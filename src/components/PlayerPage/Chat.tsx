import React from "react";
import styled from "styled-components";
import { Button } from "../StyledTags/FormAndInputs";
import { useToggle } from "react-use";

export const ChatTabLabel = 'Chat';

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
    /* justify-content: end; */
`;

const ChatBar = styled.div`
    background: lightblue;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

export default function Chat() {
    const [large, toggleSize] = useToggle(true);
    return (
        <Container>
            <MessagePanel>
                <Spacer />
                <Button onClick={() => toggleSize()}>Toggle Big/Small</Button>
                {bleh(large ? 40 : 5)}
            </MessagePanel>
            <ChatBar>
                <p>This is going to be our chat input bar.</p>
                <p>It can grow or shrink safely</p>
            </ChatBar>
        </Container>
    );
}

const bleh = (n:  Number) => (
    <>
        <p>start</p>
        {Array<any>(n).fill(<p>scrollable</p>)}
        <p>end</p>
    </>

)