import * as React from 'react';
import { getConnection } from './socket';
import './index.css';

import LobbyTable from './components/LobbyTable';
import styled from  'react-emotion';

const Container = styled('div')`
	display: flex;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: []
    };
    this.setTablesList = this.setTablesList.bind(this);
    this.resetTables = this.resetTables.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }
  
  setTablesList({ tables }) {
    this.setState({ tables });
  }

  resetTables({id}) {
    this.setState({
      tables: this.state.tables.map(table => {
        if (table.id === +id && table._prev) {
          return { ...table._prev };
        }
        return table;
      })
    })
  }

  updateTable({ id, name, participants }) {
    console.log('updateTable', { id, name, participants })
    this.setState({
      tables: this.state.tables.map(table => {
        if (table.id === +id) {
          return {
            name, participants, id, _prev: { ...table }
          }
        }
        return table;
      })
    });
    const socket = getConnection();
    socket.updateTable({ id, name, participants });
  }

  componentDidMount() {
    console.log('App mounted')
    const socket = getConnection();
    socket.onConnect(() => {
      socket.authenticate();
      socket.onAuthenticate(() => {
        socket.subscribeToTables();
      });
      socket.onTablesList(this.setTablesList);
      socket.onUpdateFailure(this.resetTables);
    });
  }

  render() {
    return (
      <Container>
        {this.state.tables.map(
          (item, index) => <LobbyTable key={index} {...item} update={this.updateTable} />
        )}
      </Container>
    );
  }
}

export default App;
