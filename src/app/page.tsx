import React from "react";
import MainWrapper from "@/app/components/MainWrapper";
import {getEventsFromRawData, RawEventData} from "@/app/utils";
import {getDataFromRedisStore, updateRedisStore} from "@/app/redis";
import Main from "@/app/main";

export default async function Home() {
    const data = await fetch("https://api.jolpi.ca/ergast/f1/2024").catch(() => undefined)
    let races: RawEventData[]
    if (data?.ok) {
        const json = await data.json()
        races = json.MRData.RaceTable.Races
        updateRedisStore(races)
    } else {
        races = await getDataFromRedisStore()
    }
    const events = getEventsFromRawData(races)

    return (
        <MainWrapper>
            <Main events={events}/>
        </MainWrapper>
    );
}
