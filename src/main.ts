import { Server, Request, Response, express } from 'hyper-express';
import { registerRouter } from 'src/routers';
import { logger } from './services/logger';
import * as cors from 'cors';

const server = new Server();

registerRouter(server);

// server.set_error_handler(
//   (request: Request, response: Response, error: Error) => {
//     console.log(error);
//   },
// );

// server.use(async (request, response) => {
//   request.body = await request.json();
// });

// Activate webserver by calling .listen(port, callback);
server
  .use(cors())
  .listen(80)
  .then((socket) => logger.log('Webserver started on port 80', 'Application'))
  .catch((error) => logger.log('Failed to start webserver on port 80'));
