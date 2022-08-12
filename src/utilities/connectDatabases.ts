import db from "../database";
import cache from "../cache";

export default async function (): Promise<void> {
  await db.$connect();
  await cache.connect();
}
