var wsUri = "wss://js-assignment.evolutiongaming.com/ws_api";
const USER_DATA = {
  "username": "user1234",
  "password": "password1234"
};

const websocket = {
  connection: null,
  callbacks: {},
  authenticate() {
    this.send({
      $type: 'login',
      ...USER_DATA
    });
  },
  onConnect(cb) {
    this.connection.onopen = cb;
  },
  onAuthenticate(cb) {
    this.callbacks['login_successful'] = [cb];
  },
  onTablesList(cb) {
    this.callbacks['table_list'] = [cb];
  },
  onUpdateFailure(cb) {
    this.callbacks['update_failure'] = [cb];
  },
  subscribeToTables() {
    this.send({
      $type: 'subscribe_tables'
    });
  },
  updateTable({id, name, participants}) {
    this.send({
      $type: 'update_table',
      table: {
        id,
        name,
        participants,
      }
    });
  },
  send(data) {
    this.connection.send(JSON.stringify(data));
  },
  onMessage(type, payload) {
    console.log('===WS_GOT_MESSAGE===', type, payload);
    const cbs = this.callbacks[type];
    if (cbs && cbs.length) {
      cbs.forEach(cb => cb(payload));
    }
  },
};

export const getConnection = () => {
  if (websocket.connection) {
    return websocket;
  }
  websocket.connection = new WebSocket(wsUri);
  websocket.connection.onmessage = onMessage;
  return websocket;
}

function onMessage(evt) {
  const data = JSON.parse(evt.data);
  const { $type, ...payload } = data;
  websocket.onMessage($type, payload);
}
