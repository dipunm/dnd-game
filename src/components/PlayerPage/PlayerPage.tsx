import React from "react";
import CharacterSheet, { CharacterTabLabel } from "./CharacterSheet";
import Chat, { ChatTabLabel } from "./Chat";
import { More } from "./Navigation";
import { NavBar, TabList, Tab, TabPanel } from "../StyledTags/Navigation";
import { useTabState } from "reakit";
import styled from "styled-components";

const FlexStack = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const FlexFill = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;


export default function PlayerPage() {
  const tab = useTabState();
  return (
    <FlexStack>
      <NavBar>
        <TabList {...tab}>
          <Tab {...tab}>{CharacterTabLabel}</Tab>
          <Tab {...tab}>{ChatTabLabel}</Tab>
          <Tab {...tab}>Dice</Tab>
        </TabList>
        <More />
      </NavBar>

      <FlexFill>
        <TabPanel {...tab} tabIndex={-1} style={{ overflow: 'auto' }}>
          <CharacterSheet />
        </TabPanel>

        <TabPanel {...tab} tabIndex={-1} style={{ overflow: 'auto', flexGrow: 1 }}>
          <Chat />
        </TabPanel>

        <TabPanel {...tab} tabIndex={-1}>
          This will host the dice.
        </TabPanel>
      </FlexFill>
    </FlexStack>    
  )
}