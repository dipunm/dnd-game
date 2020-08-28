import React from "react"
import { useDiceBoardRenderer } from "./useDiceBoardRenderer";
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    &>div {
        flex-grow: 1;
        overflow: hidden;
    }
`;

const HTML_EMPTY = {__html: ''};
export const DiceBoard = () => {
    const containerRef = useDiceBoardRenderer();
    return (
    <Container>
        <div ref={containerRef} dangerouslySetInnerHTML={HTML_EMPTY} />
    </Container>
    );
}
