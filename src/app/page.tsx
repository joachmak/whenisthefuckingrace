import React from "react";
import MainWrapper from "@/app/components/MainWrapper";
import {getEventsFromRawData, RawEventData} from "@/app/utils";
import {BadWord, BigText, RedWord, SmallText} from "@/app/components/TextTypes";
import LocalTime from "@/app/components/LocalTime";
import {headers} from "next/headers";

export default async function Home() {
    const headersList = await headers()
    const locale = headersList.get("accept-language")?.split(",")[0] ?? "no-NB"

    const data = await fetch("https://ergast.com/api/f1/current.json")
    const json = await data.json()
    const races: RawEventData[] = json.MRData.RaceTable.Races
    const events = getEventsFromRawData(races)
    const timeNow = new Date()
    const nextEvent = events.find(event => event.endTime.getTime() > timeNow.getTime())

    return (
        <MainWrapper>
            {
                nextEvent ?
                    <>
                        {timeNow > nextEvent.startTime && timeNow < nextEvent.endTime && <RaceLiveBanner/>}
                        <section className="flex flex-col items-center gap-2 justify-center">
                            <SmallText>The next <BadWord>f#cking</BadWord> f1 event is the</SmallText>
                            <BigText>{nextEvent.location}</BigText>
                            <SmallText>grand <BadWord>f#cking</BadWord> prix</SmallText>
                        </section>
                        <section className="flex flex-col items-center gap-2 justify-center">
                            <SmallText>It&apos;s gonna be a <BadWord>f#cking</BadWord></SmallText>
                            <BigText>{nextEvent.type}</BigText>
                        </section>
                        <section className="flex flex-col items-center gap-2 justify-center">
                            <SmallText>It&apos;s gonna start at</SmallText>
                            <BigText><LocalTime locale={locale} time={nextEvent.startTime}/></BigText>
                            <SmallText>And <i><RedWord>not</RedWord></i> the weird <BadWord>f#cking</BadWord> time
                                they
                                display at
                                formula1.com</SmallText>
                        </section>
                    </> :
                    <section>
                        Season is over &lt;/3
                    </section>
            }
        </MainWrapper>
    );
}

const RaceLiveBanner = () => {
    return (
        <span className="absolute top-0 w-full bg-red-900 py-3">Event is live!</span>
    )
}
