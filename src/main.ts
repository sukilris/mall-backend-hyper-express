import { Server, Request, Response, express } from 'hyper-express';
import { registerRouter } from 'src/routers';
import { logger } from './services/logger';

const server = new Server();

registerRouter(server);

// server.set_error_handler(
//   (request: Request, response: Response, error: Error) => {
//     console.log(error);
//   },
// );

server.use(async (request, response) => {
  // You can also just return new Promise((resolve, reject) => {}); instead of async callback
  request.body = await request.json();
});

// Activate webserver by calling .listen(port, callback);
server
  .listen(80)
  .then((socket) => logger.log('Webserver started on port 80', 'Application'))
  .catch((error) => logger.log('Failed to start webserver on port 80'));
