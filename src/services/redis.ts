import Redis, { RedisKey } from 'ioredis';
import { logger } from './logger';
import { redisConfig } from 'configuration';

const redisClient = new Redis(redisConfig);

redisClient.on('error', (err) => {
  logger.error('Redis error:', err.message);
  // 根据错误类型决定是否需要重连或者执行其他错误处理逻辑
});

redisClient.on('connect', () => {
  logger.log('Redis connect success', 'Redis Service');
});

export const redisService = {
  async get(key: string): Promise<string | null> {
    return redisClient.get(key);
  },

  async set(key: string, value: string, ttl: number = 0): Promise<void> {
    if (ttl > 0) {
      await redisClient.set(key, value, 'EX', ttl);
    } else {
      await redisClient.set(key, value);
    }
  },
  async del(key: RedisKey[]): Promise<void> {
    await redisClient.del(key);
  },
};
