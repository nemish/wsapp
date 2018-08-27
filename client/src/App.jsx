import * as React from 'react';
import './index.css';

import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    const socket = io('localhost:3000');
    this.interval = setInterval(() => {
      socket.emit('date message', new Date().toString());
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
      <div>
        <h1>Messages:</h1>
        <ul>
        {this.state.messages.map(
          (msg, index) => <li key={index}>{msg}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default App;
