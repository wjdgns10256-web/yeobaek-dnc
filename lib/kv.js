import { Redis } from "@upstash/redis";

// Vercel Marketplace의 Redis(Upstash) 연동을 추가하면 KV_REST_API_URL / KV_REST_API_TOKEN
// (또는 UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) 환경변수가 자동으로 설정됩니다.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvConfigured = Boolean(url && token);

const redis = kvConfigured ? new Redis({ url, token }) : null;

// 로컬 개발 등 Redis가 연결되지 않은 환경을 위한 메모리 폴백입니다. 서버(함수) 인스턴스가
// 재시작되거나 여러 개로 분산되는 실제 배포 환경에서는 값이 공유되지 않으므로,
// 방문자에게 실제로 반영되는 프로덕션에서는 반드시 Redis 연동이 필요합니다.
const memoryStore = new Map();

export async function kvGet(key) {
  if (redis) return redis.get(key);
  return memoryStore.has(key) ? memoryStore.get(key) : null;
}

export async function kvSet(key, value) {
  if (redis) return redis.set(key, value);
  memoryStore.set(key, value);
  return "OK";
}
