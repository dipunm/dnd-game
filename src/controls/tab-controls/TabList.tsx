import styled from "styled-components";
import { TabList as ReakitTabList } from 'reakit';

export const TabList = styled(ReakitTabList)`
    min-height: 48px;

    display: flex;
    align-items: stretch;
    > * {
        flex-basis: 0;
        flex-grow: 1;
}
`;
