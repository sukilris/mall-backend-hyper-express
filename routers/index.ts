import { Server } from 'hyper-express';
import { registerUserRouter } from './user';

export const registerRouter = (server: Server) => {
  registerUserRouter(server);
};
