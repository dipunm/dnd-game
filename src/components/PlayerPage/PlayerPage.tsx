import React from "react";
import styled from "styled-components";
import { useMenuState, useTabState, Separator } from "reakit";
import UserObservable from "../../observables/UserObservable";
import { TabPanel, TabList, Tab, NavBar, NavMenuButton, NavMenu, NavMenuItem } from "../StyledTags/Navigation";
import { Button } from "../StyledTags/FormAndInputs";
import { MoreVertical} from "grommet-icons";
import { useObservable } from "react-use";

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

export default function PlayerPage() {
    const tab = useTabState();
    const menu = useMenuState({ placement: 'bottom-end', gutter: -10 });
    const user = useObservable(UserObservable);
    
    return (
        <>
            <NavBar>
                <TabList {...tab}>
                    <Tab {...tab}>character sheet</Tab>
                    <Tab {...tab}>chat</Tab>
                    <Tab {...tab}>dice board</Tab>
                </TabList>
                <NavMenuButton {...menu}><MoreVertical /></NavMenuButton>
            </NavBar>
            <NavMenu {...menu} aria-label="Navigation submenu">
                <small>Logged in as <strong>{user?.username}</strong></small><br />
                <Separator />
                <NavMenuItem {...menu} onClick={() => UserObservable.reset()}>
                    Logout
                </NavMenuItem>
            </NavMenu>
            <TabPanel {...tab}>
                <Main>
                    <InfoBox>
                        <h1>Mighty Morphin Micheal Vick</h1>
                        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
                        <Button>THIS IS A BUTTOn</Button>
                    </InfoBox>
                </Main>
            </TabPanel>
        </>
    );
}