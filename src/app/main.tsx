"use client"
import {RaceEvent} from "@/app/utils";
import {BadWord, BigText, RedWord, SmallText} from "@/app/components/TextTypes";
import LocalTime from "@/app/components/LocalTime";
import React from "react";

interface Props {
    events: RaceEvent[]
}

export default function Main({events}: Props) {
    const timeNow = new Date()
    const nextEvent = events.find(event => event.endTime.getTime() > timeNow.getTime())
    const nextRace = nextEvent?.type === "race" ? undefined : events.find(event => event.endTime.getTime() > timeNow.getTime() && event.type === "race")
    if (nextEvent) return (
        <>
            {timeNow >= nextEvent.startTime && timeNow < nextEvent.endTime && <RaceLiveBanner/>}
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
                <BigText><LocalTime time={nextEvent.startTime}/></BigText>
                <SmallText>And <i><RedWord>not</RedWord></i> the weird <BadWord>f#cking</BadWord> time
                    they
                    display at
                    formula1.com</SmallText>
            </section>
            {
                nextRace &&
              <SmallText>Race: <LocalTime time={nextRace.startTime}/></SmallText>
            }
        </>
    )
    return (
        <section>
            Season is over &lt;/3
        </section>
    )
}

const RaceLiveBanner = () => {
    return (
        <span className="absolute top-0 w-full bg-red-900 py-3">Event is live!</span>
    )
}