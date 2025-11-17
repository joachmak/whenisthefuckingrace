'use server'
import raceData from './response.json'
import {RawEventData} from "@/app/utils";

export async function getRaceData(): Promise<RawEventData[]> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return raceData.MRData.RaceTable.Races
}
