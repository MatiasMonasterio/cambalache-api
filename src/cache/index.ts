import { createClient } from "redis";

import { REDIS_URL } from "../config/env";

const client = createClient({
  url: REDIS_URL,
});

const set = async <T>(key: string, expire: number, value?: T): Promise<void> => {
  await client.set(key, JSON.stringify(value || {}));
  await client.expire(key, expire);
};

const get = async <T>(key: string): Promise<T | null> => {
  const reply = await client.get(key);
  return reply ? JSON.parse(reply) : reply;
};

const del = async (key: string): Promise<void> => {
  await client.del(key);
};

const connect = async (): Promise<void> => {
  await client.connect();
};

export default {
  set,
  get,
  del,
  connect,
};
