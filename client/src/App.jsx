import * as React from 'react';
import { createConnection } from './socket';
import './index.css';

import LobbyTable from './components/LobbyTable';
import styled from  'react-emotion';

import lobbyTables from './lobby-tables.json';

const Container = styled('div')`
	display: flex;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: lobbyTables.tables
    };
    this.setTablesList = this.setTablesList.bind(this);
  }
  
  setTablesList({ tables }) {
    this.setState({ tables })
  }

  componentDidMount() {
    // const socket = createConnection();
    // socket.onConnect(() => {
    //   socket.authenticate();
    //   socket.onAuthenticate(() => {
    //     socket.subscribeToTables();
    //   });
    //   socket.onTablesList(this.setTablesList);
    // });
  }

  render() {
    return (
      <Container>
        {this.state.tables.map(
          (item, index) => <LobbyTable key={index} {...item} />
        )}
      </Container>
    );
  }
}

export default App;
