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
      minDuration,
      maxDuration,
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
      minDuration?: number;
      maxDuration?: number;
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
        startTime,
      });
    }
    if (endTime) {
      queryBuilder.andWhere('request.endTime <= :endTime', {
        endTime,
      });
    }
    if (minDuration !== undefined) {
      queryBuilder.andWhere('request.duration >= :minDuration', {
        minDuration,
      });
    }
    if (maxDuration !== undefined) {
      queryBuilder.andWhere('request.duration <= :maxDuration', {
        maxDuration,
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

  router.get('/request/distribution', async (request, response) => {
    const query = `
    SELECT COUNT(*) as totalCount,
    SUM(CASE WHEN duration >=0 AND duration < 100 THEN 1 ELSE 0 END) as countDuration0To100,
    SUM(CASE WHEN duration >= 100 AND duration < 400 THEN 1 ELSE 0 END) as countDuration100To400,
    SUM(CASE WHEN duration >= 400 AND duration < 1000 THEN 1 ELSE 0 END) as countDuration400To1000,
    SUM(CASE WHEN duration >= 1000 THEN 1 ELSE 0 END) as countDuration1000Plus
    FROM performance_request
    `;
    const result = await requestRepository.query(query);
    response.json({
      code: 0,
      message: 'success',
      data: {
        totalCount: result[0].totalCount,
        countDuration0To100: result[0].countDuration0To100,
        countDuration100To400: result[0].countDuration100To400,
        countDuration400To1000: result[0].countDuration400To1000,
        countDuration1000Plus: result[0].countDuration1000Plus,
      },
    });
  });

  server.use('/performance', router);
};
