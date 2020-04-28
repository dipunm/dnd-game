import React, { useEffect, useState } from 'react';
import './App.css';
import PlayerScreen from '../PlayerScreen/PlayerScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import { useObservable } from 'react-use';
import UserObservable from '../../observables/UserObservable';

function App() {
  const user = useObservable(UserObservable);
  console.log('user', user);
  return (
    <div className="App">
      { !user ? (
        <LoginScreen />
      ) : (
        <PlayerScreen />
      ) }
      {/* <DMScreem /> */}
    </div>
  );
}

export default App;
