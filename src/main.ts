import { Server } from 'hyper-express';
import { registerRouter } from 'routers';

const server = new Server();

server.get('/', (request, response) => {
  response.send('Hello World');
});

registerRouter(server);

// Activate webserver by calling .listen(port, callback);
server
  .listen(80)
  .then((socket) => console.log('Webserver started on port 80'))
  .catch((error) => console.log('Failed to start webserver on port 80'));
