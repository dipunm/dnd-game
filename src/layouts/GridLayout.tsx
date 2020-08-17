import styled from "styled-components";

export const GridLayout = styled.div.attrs(() => ({columnCount: 4}))`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    display: grid;
    grid-template-columns: ${props => Array.from(Array(props.columnCount), () => '1fr').join(' ')};
    padding: 20px;
`;