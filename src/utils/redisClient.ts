import Redis from 'ioredis';
import { config } from '../../config/config';

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

export const addKeyValueRedis = async (key: string, value: string, expire: number) => {
  await redis.set(key, value, 'EX', expire);
};

export const getValueRedis = async (key: string) => {
  return await redis.get(key);
};

export const deleteKeyRedis = async (key: string) => {
  await redis.del(key);
};
