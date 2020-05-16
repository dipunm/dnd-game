import React from "react";
import styled from "styled-components";
import {  useTabState } from "reakit/Tab";
import UserObservable from "../../observables/UserObservable";
import { TabPanel, TabList, Tab, NavButton } from "../StyledTags/Navigation";
import { Button } from "../StyledTags/FormAndInputs";
import colors from "../../constants/colors";
import { Logout, MoreVertical} from "grommet-icons";

const Main = styled.main`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 20px;
`;

const InfoBox = styled.div`
    grid-column: span 2;
    font-size: 1rem;
    h1 {
        font-size: 1.3em;
        text-align: center;
        text-transform: uppercase;
        font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
    }

    p {
        text-align: justify;
        font-size: 1em;
    }
`;

const NavBar = styled.nav`
    background: ${colors.primary};
    box-shadow: 0 0 10px black;

    display: flex;
    flex-direction: row;
    align-items: stretch;
    ${TabList} {
        flex-grow: 1;
    }
`;

export default function PlayerPage() {
    const tab = useTabState();

    return (
        <>
            <NavBar>
                <TabList {...tab}>
                    <Tab {...tab}>character sheet</Tab>
                    <Tab {...tab}>chat</Tab>
                    <Tab {...tab} disabled>roll</Tab>
                </TabList>
                <NavButton onClick={() => UserObservable.reset()} title="Logout"><MoreVertical  /></NavButton>
            </NavBar>
            <TabPanel {...tab}>
                <Main>
                    <InfoBox>
                        <h1>Mighty Morphin Micheal Vick</h1>
                        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
                        <Button disabled>THIS IS A BUTTOn</Button>
                    </InfoBox>
                </Main>
            </TabPanel>
        </>
    );
}