import { Router, Server } from 'hyper-express';
import { Request } from 'src/entities/request.entity';
import { UserInfo } from 'src/common/user.entiry';
import { requestRepository } from 'src/repository/request';
import { toTimestamp } from 'src/common/utils/time';

export const registerRequestRouter = (server: Server) => {
  const router = new Router();

  router.post('/request/track', async (request, response) => {
    const { logs, userInfo } = (await request.json()) as {
      logs: Request[];
      userInfo?: UserInfo;
    };
    const requestLogs = logs.map((log) => {
      return {
        ...log,
        startTime: toTimestamp(log.startTime as unknown as number),
        endTime: toTimestamp(log.endTime as unknown as number),
        ...userInfo,
        ip: request.ip,
      };
    });
    await requestRepository.save(requestLogs);
    response.json({ code: 0, message: 'success', data: null });
  });

  router.post('/request/page', async (request, response) => {
    const { pageNum, pageSize } =
      (await request.json()) as Common.Pagination & {};

    const result = await requestRepository.find({});
    response.json({ code: 0, message: 'success', data: null });
  });

  server.use('/performance', router);
};
