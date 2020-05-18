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
  overflow: auto;
`;


export default function PlayerPage() {
  const tab = useTabState();
  return (
    <FlexStack>
      <NavBar>
        <TabList {...tab}>
          <Tab {...tab}>{CharacterTabLabel}</Tab>
          <Tab {...tab}>{ChatTabLabel}</Tab>
        </TabList>
        <More />
      </NavBar>

      <FlexFill as={TabPanel} {...tab} tabIndex={-1}>
        <CharacterSheet />
      </FlexFill>

      <FlexFill as={TabPanel} {...tab} tabIndex={-1}>
        <Chat />
      </FlexFill>
    </FlexStack>    
  )
}