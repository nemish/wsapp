var wsUri = "wss://";
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
  subscribeToTables() {
    this.send({
      $type: 'subscribe_tables'
    });
  },
  send(data) {
    this.connection.send(JSON.stringify(data));
  },
  onMessage(type, payload) {
    const cbs = this.callbacks[type];
    if (cbs && cbs.length) {
      cbs.forEach(cb => cb(payload));
    }
  },
};

export const createConnection = () => {
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
