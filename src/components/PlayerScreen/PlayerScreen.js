import React, { useEffect, useState, useRef } from 'react';
// import D20 from '../D20/D20';
import Chat from '../Chat/Chat';
import Modal from '../Modal/Modal';
import { useObservable } from 'react-use';
import UserObservable from '../../observables/UserObservable';
import DiceBoard from '../DiceBoard/DiceBoard';

export default () => {
    const { username, displayName } = useObservable(UserObservable) || {}

    return (
        <>
            <main className="App-main">
                <p>Logged in as {username}. <button onClick={() =>  UserObservable.reset()}>logout</button></p>
                <header className="App-header">
                    <h1>
                        <input className="NameInput" 
                            autoFocus
                            value={displayName} 
                            onChange={e => UserObservable.setDisplayName(e.target.value)} 
                            placeholder="Character Name" />
                        
                    </h1>
                </header>
                <section className="App-game">
                    <Modal show={true}>
                        <DiceBoard />
                    </Modal>
                </section>
            </main>
            <section className="App-aside">
                <Chat />
            </section>
        </>
    );
}