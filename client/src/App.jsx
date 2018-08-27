import * as React from 'react';
import { createConnection } from './socket';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    };
    this.setTablesList = this.setTablesList.bind(this);
  }
  
  setTablesList({ tables }) {
    this.setState({ tables })
  }

  componentDidMount() {
    const socket = createConnection();
    socket.onConnect(() => {
      socket.authenticate();
      socket.onAuthenticate(() => {
        socket.subscribeToTables();
      });
      socket.onTablesList(this.setTablesList);
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Tables list:</h1>
        <ul>
          {this.state.tables.map(
            (item, index) => <li key={index}>{item.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
