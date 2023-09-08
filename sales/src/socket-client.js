import React, { Component } from 'react';
import io from 'socket.io-client';

class SocketClient extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      newMessage: '', // State to store the new message to send
    };
  }

  componentDidMount() {
    // Connect to the Socket.IO server
    this.socket = io('http://16.163.178.109:9001');

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('chat message', (message) => {
      // Update the state with received messages
      this.setState((prevState) => ({
        messages: [...prevState.messages, message],
      }));
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  }

  componentWillUnmount() {
    // Disconnect the socket when the component unmounts
    this.socket.disconnect();
  }

  // Function to handle sending a new chat message
  sendChatMessage = () => {
    const { newMessage } = this.state;
    // Emit the new message to the server
    this.socket.emit('chat message', newMessage);
    // Clear the input field after sending
    this.setState({ newMessage: '' });
  };

  render() {
    return (
      <div>
        <h1>Socket.IO Client</h1>
        <ul>
          {this.state.messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            placeholder="Type your message..."
            value={this.state.newMessage}
            onChange={(e) => this.setState({ newMessage: e.target.value })}
          />
          <button onClick={this.sendChatMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default SocketClient;
