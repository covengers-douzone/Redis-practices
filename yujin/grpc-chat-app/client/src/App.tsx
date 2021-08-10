import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {InitiateRequest} from './proto/chat_pb';
import { ChatClient } from './proto/ChatServiceClientPb';

function App() {
  useEffect(()=>{
    (async () => {
      const client = new ChatClient("http://localhost:8082");
      const request = new InitiateRequest();
      request.setName("yujin");
      request.setAvatarUrl("dadadadada");
      const response = await client.chatInitiate(request, {}).catch(console.error);
      console.log(response);
    })();

  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
