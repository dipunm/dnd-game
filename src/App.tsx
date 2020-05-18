import React from "react";
import { useObservable } from "react-use";

import { FocusVisibleManager } from "use-focus-visible";
import BreakpointLock from "./components/Layout/BreakpointLock";
import FullPage from "./components/Layout/FullPage";

import LoginPage from "./components/LoginPage/LoginPage";
import UserObservable from "./observables/UserObservable";
import PlayerPage from "./components/PlayerPage/PlayerPage";


function App() {
  const user = useObservable(UserObservable);

  const page = user ? ( 
    <PlayerPage /> 
  ):( 
    <LoginPage />
  ); 

  return (
    <FocusVisibleManager>
      <FullPage>
        <BreakpointLock>
          { page }
        </BreakpointLock>
      </FullPage>
    </FocusVisibleManager>
  );
}

export default App;
