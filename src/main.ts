import { Server } from 'hyper-express';
import { registerRouter } from 'src/routers';
import { logger } from './services/logger';

const server = new Server();

registerRouter(server);

// Activate webserver by calling .listen(port, callback);
server
  .listen(80)
  .then((socket) => logger.log('Webserver started on port 80'))
  .catch((error) => logger.log('Failed to start webserver on port 80'));
