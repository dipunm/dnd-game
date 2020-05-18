import styled from "styled-components";
import React from "react";
import { Button } from "../StyledTags/FormAndInputs";

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

export const CharacterTabLabel = 'Character Sheet';

export default function CharacterSheet() {
  return (
    <Main>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
      <InfoBox>
        <h1>Mighty Morphin Micheal Vick</h1>
        <p>Lives in a mud pit, is known for crying all the time and has no money or pockets.</p>
        <Button>THIS IS A BUTTOn</Button>
      </InfoBox>
    </Main>
  );
}