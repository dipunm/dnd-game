import React, { useState } from 'react';
import UserObservable from '../../observables/UserObservable';

export default () => {
    const [name, setName] = useState('');

    return (
        <main className="App-main">
            <form onSubmit={e => {
                e.preventDefault();
                UserObservable.createUser(name)
            }}>
            <header className="App-header">
                <h1>
                    <input className="NameInput" 
                        autoFocus
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Enter a username" />
               </h1>
            </header>
            <button type="submit">Enter</button>
            </form>
        </main>
    )
}