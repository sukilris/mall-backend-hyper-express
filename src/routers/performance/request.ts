import { Router, Server } from 'hyper-express';

export const registerRequestRouter = (server: Server) => {
  const router = new Router();

  router.post('/request/track', async (request, response) => {
    const { logs } = (await request.json()) as {
      logs: PerformanceLogger.Request[];
    };
    // console.log(logs);
  });

  server.use('/performance', router);
};
