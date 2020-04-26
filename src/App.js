import React, { useState, useEffect } from 'react';
import './App.css';
import D20 from './D20';
import Chat from './Chat/Chat';
const io = require('socket.io-client');

function App() {
  const [socket, setSocket] = useState();
  useEffect(() => {

    setSocket(io());

  }, [])

  return (
    <div className="App">
      <main className="App-main">
        <header className="App-header">
          <h1><input className="NameInput" type="text" placeholder="Enter Your Name Here" /></h1>
        </header>
        <section className="App-game">
          {/* <D20 /> */}
        </section>
      </main>
      <section className="App-aside">
          <Chat />
        </section>
    </div>
  );
}

export default App;
