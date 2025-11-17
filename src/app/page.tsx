import React from "react";
import MainWrapper from "@/app/components/MainWrapper";
import {getEventsFromRawData, RawEventData} from "@/app/utils";
import Main from "@/app/main";

export default async function Home() {
    const currentYear = (new Date()).getUTCFullYear()
    const data = await fetch(`https://api.jolpi.ca/ergast/f1/${currentYear}`).catch(() => undefined)

    if (!data?.ok) {
        throw new Error('Failed to fetch race data from F1 API')
    }

    const json = await data.json()
    const races: RawEventData[] = json.MRData.RaceTable.Races
    const events = getEventsFromRawData(races)

    return (
        <MainWrapper>
            <Main events={events}/>
        </MainWrapper>
    );
}
