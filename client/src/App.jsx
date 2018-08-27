import * as React from 'react';
import './index.css';

import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      sentMessages: [],
      messages: []
    }
  }

  componentDidMount() {
    const socket = io('localhost:3000');
    this.interval = setInterval(() => {
      const msg = new Date().toString();
      this.setState({sentMessages: this.state.sentMessages.concat(msg)})
      socket.emit('date message', msg);
    }, 2000);
    socket.on('ololo message', data => {
      this.setState({messages: this.state.messages.concat(data.msg)})
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Sent messages:</h1>
          <ul>
            {this.state.sentMessages.map(
              (msg, index) => <li key={index}>{msg}</li>
            )}
          </ul>
        </div>
        <div>
          <h1>Received messages:</h1>
          <ul>
            {this.state.messages.map(
              (msg, index) => <li key={index}>{msg}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
