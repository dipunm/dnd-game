import React from "react";
import { useObservable } from "react-use";

import LoginPage from "./components/LoginPage/LoginPage";
import UserObservable from "./observables/UserObservable";
import styled from "styled-components";
import PlayerPage from "./components/PlayerPage/PlayerPage";
import { FocusVisibleManager } from "use-focus-visible";


/**
 * breakpoints: 400, 500, 700, 1100, 1700
 * names:
 *  < 400   Tiny    xs
 *  < 500   Phone   s
 *  < 700   Tablet  m
 *  < 1100  PC      l
 *  *       HDTV+   xl
 */

const lock = ({width = 500, children = null, ...props}) => (
  <div {...props}>
    <span dangerouslySetInnerHTML={{__html: `<!-- Device Lock: ${width}px wide -->`}} />
    <div>{children}</div>
  </div>
);
const DeviceLock = styled(lock).attrs(() => ({ width: 500 }))`
  @media screen and (min-width: ${props => props.width}px) {
    margin: 0 auto;
    max-width: ${props => props.width}px;
    box-shadow: 0 0 0 50vw black;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    &>div {
      flex-grow: 1;
      display: block;
    }
  }
`;

function App() {
  const user = useObservable(UserObservable);
  return (
    <DeviceLock>
      <FocusVisibleManager>
        {user ? <PlayerPage /> : <LoginPage /> }
      </FocusVisibleManager>
    </DeviceLock>
  );
}

export default App;
