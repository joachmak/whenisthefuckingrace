"use server"

import {RawEventData} from "@/app/utils";
import {createClient} from "redis";

const getRedisKey = () => `raceData:${new Date().getUTCFullYear()}`

export const getDataFromRedisStore = async (): Promise<RawEventData[]> => {
    const url = process.env.REDIS_URL
    if (!url) {
        console.error("REDIS_URL not found")
        return []
    }
    const client = createClient({url});
    client.on('error', (err) => {
        console.error('Redis connection error:', err);
        return []
    });
    await client.connect();

    const data = await client.get(getRedisKey())
    return JSON.parse(data ?? "[]")
}

export const updateRedisStore = async (data: RawEventData[]) => {
    const url = process.env.REDIS_URL
    if (!url) {
        console.error("REDIS_URL not found")
        return []
    }
    const client = createClient({url});
    client.on('error', (err) => {
        console.error('Redis connection error:', err);
    });
    await client.connect();
    await client.set(getRedisKey(), JSON.stringify(data));
}