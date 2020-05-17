import React, { ReactElement, ElementType } from "react";
import styled from "styled-components";
import { useMenuState, useTabState, Separator, DialogDisclosure, useDialogState } from "reakit";
import UserObservable from "../../observables/UserObservable";
import { TabPanel, TabList, Tab, NavBar, NavMenuButton, NavMenu, NavMenuItem, NavLabel } from "../StyledTags/Navigation";
import { Button } from "../StyledTags/FormAndInputs";
import { MoreVertical} from "grommet-icons";
import { useObservable } from "react-use";
import { withFocusVisibleAttr } from "../StyledTags/FocusVisible";
import { DialogBackdrop, Dialog } from "../StyledTags/Dialog";

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

function LogoutBtn({ className }: React.ComponentProps<ElementType>) {
    const dialog = useDialogState({ modal: true, visible: true });

    return (
        <>
            <DialogDisclosure className={className} as={NavMenuItem} {...dialog}>
                Logout
            </DialogDisclosure>
            <DialogBackdrop {...dialog}>
                <Dialog role="alertdialog" {...dialog}>
                    <p>Are you sure you want to logout?</p>
                    <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '20px' }}>
                        <Button primary onClick={() => UserObservable.reset()}>Yes</Button>
                        <Button onClick={() => dialog.hide()}>Cancel</Button>
                    </div>
                </Dialog>
            </DialogBackdrop>
        </>
    );
}

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
            <NavMenu {...menu} aria-labelled-by="Navigation submenu">
                <NavLabel>You are logged in as <strong>{user?.username}</strong></NavLabel>
                <Separator />
                <NavMenuItem {...menu} as={LogoutBtn} />
            </NavMenu>
            <TabPanel {...tab} tabIndex={-1}>
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