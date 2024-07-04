import { Server } from 'hyper-express';
import { registerUserRouter } from './user';
import { registerRequestRouter } from './performance/request';

export const registerRouter = (server: Server) => {
  registerRequestRouter(server);
};
