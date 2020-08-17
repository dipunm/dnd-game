import styled from "styled-components";

/**
 * A flexbox div with full page height, stacking its children top to bottom.
 */
export const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;