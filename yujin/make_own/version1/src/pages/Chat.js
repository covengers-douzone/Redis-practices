import React, {useState} from 'react';
import '../assets/css/App.css';
import App from "../App";

function Chat(props) {
    // query parameter
    const querys = props.location.search.replace("?","").split('&');
    const parameter = {};
    querys.map(query => {
        query = query.split('=');
        parameter[query[0]] = query[1];
    })

    // form
    const [msg, setMsg] = useState('');

    const onChangeInputMsg = (e) => {
        setMsg(e.target.value);
    }

    const formSubmit = (e) => {
        console.log(e)
    }
    return(
        <div className="chat-container">
              <header className="chat-header">
                <h1><i className="fas fa-smile"></i> ChatCord</h1>
                <a id="leave-btn" className="btn">Leave Room</a>
              </header>
              <main className="chat-main">
                <div className="chat-sidebar">
                  <h3><i className="fas fa-comments"></i> Room Name:</h3>
                  <h2 id="room-name">{parameter['room']}</h2>
                  <h3><i className="fas fa-users"></i> Users</h3>
                  <ul id="users">{parameter['username']}</ul>
                </div>
                <div className="chat-messages"></div>
              </main>
              <div className="chat-form-container">
                <form id="chat-form" onSubmit={formSubmit}>
                  <input
                    id="msg"
                    type="text"
                    placeholder="Enter Message"
                    required
                    autocomplete="off"
                    value={ msg } onChange={ onChangeInputMsg }
                  />
                  <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
                </form>
              </div>
            </div>
    );
}
export default Chat;