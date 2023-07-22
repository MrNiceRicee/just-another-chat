// websocket client

export function connection<T>(
  url: string,
  message: string,
  callback: (data: T) => void,
) {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    ws.send(message);
  };

  ws.onmessage = (event) => {
    // eslint-disable-next-line no-console
    console.log(event.data);
    callback(event.data as T);
  };

  ws.onclose = () => {
    // websocket is closed.
  };

  ws.onerror = (error) => {
    // an error occurred when sending/receiving data
    console.error(error);
  };

  return ws;
}
