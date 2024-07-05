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
        ...userInfo,
        ip: request.ip,
      };
    });
    await requestRepository.save(requestLogs);
    response.json({ code: 0, message: 'success', data: null });
  });

  router.post('/request/list', async (request, response) => {
    const {
      pageNum,
      pageSize,
      userId,
      username,
      url,
      startTime,
      endTime,
      status,
      code,
      ip,
      email,
    } = (await request.json()) as Common.Pagination & {
      userId?: string;
      username?: string;
      url?: string;
      startTime?: number;
      endTime?: number;
      status?: number;
      code?: number;
      ip?: string;
      email?: string;
    };
    const queryBuilder = requestRepository.createQueryBuilder('request');
    if (userId) {
      queryBuilder.andWhere('request.userId = :userId', { userId });
    }
    if (username) {
      queryBuilder.andWhere('request.username = :username', { username });
    }
    if (url) {
      queryBuilder.andWhere('request.url = :url', { url });
    }
    if (startTime) {
      queryBuilder.andWhere('request.startTime >= :startTime', {
        startTime: new Date(startTime),
      });
    }
    if (endTime) {
      queryBuilder.andWhere('request.endTime <= :endTime', {
        endTime: new Date(endTime),
      });
    }
    if (status) {
      queryBuilder.andWhere('request.status = :status', { status });
    }
    if (code) {
      queryBuilder.andWhere('request.code = :code', { code });
    }
    if (ip) {
      queryBuilder.andWhere('request.ip = :ip', { ip });
    }
    if (email) {
      queryBuilder.andWhere('request.email = :email', { email });
    }
    const [logs, total] = await queryBuilder
      .orderBy('request.createTime', 'DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    response.json({
      code: 0,
      message: 'success',
      data: {
        list: logs,
        totalPage: Math.ceil(total / pageSize),
        total,
        pageNum,
        pageSize,
      },
    });
  });

  server.use('/performance', router);
};
