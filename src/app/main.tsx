"use client"
import {RaceEvent} from "@/app/utils";
import {BadWord, BigText, RedWord, SmallText} from "@/app/components/TextTypes";
import LocalTime from "@/app/components/LocalTime";
import React, {useEffect, useState} from "react";

interface Props {
    events: RaceEvent[]
}

export default function Main({events}: Props) {
    const [isLive, setIsLive] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const timeNow = new Date()
    const nextEvent = events.find(event => event.endTime.getTime() > timeNow.getTime())
    const nextRace = nextEvent?.type === "race" ? undefined : events.find(event => event.endTime.getTime() > timeNow.getTime() && event.type === "race")

    if (typeof document !== 'undefined') {
        window.addEventListener('scroll', () => {
            setScrollPosition(window.scrollY);
        });
    }

    useEffect(() => {
        setInterval(() => {
            const currentYear = new Date().getUTCFullYear();
            fetch(`https://api.jolpi.ca/ergast/f1/${currentYear}`)
                .then(response => response.json())
                .then(data => {
                    const races = data.MRData.RaceTable.Races;
                    setIsLive(races !== undefined)
                });
        }, 5000);
    }, [nextEvent]);

    useEffect(() => {

    }, []);
    console.log(scrollPosition)
    if (nextEvent) return (
        <div>
            {isLive && <div>Event is live!</div>}
            {timeNow >= nextEvent.startTime && timeNow < nextEvent.endTime && <RaceLiveBanner/>}
            <div tabIndex={1} className="flex flex-col items-center gap-2 justify-center">
                <SmallText>The next <BadWord>f#cking</BadWord> f1 event is the</SmallText>
                <BigText>{nextEvent.location}</BigText>
                <SmallText>grand <BadWord>f#cking</BadWord> prix</SmallText>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
                <SmallText>It&apos;s gonna be a <BadWord>f#cking</BadWord></SmallText>
                <BigText>{nextEvent.type}</BigText>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
                <SmallText>It&apos;s gonna start at</SmallText>
                <BigText><LocalTime time={nextEvent.startTime}/></BigText>
                <SmallText>And <i><RedWord>not</RedWord></i> the weird <BadWord>f#cking</BadWord> time
                    they
                    display at
                    formula1.com</SmallText>
            </div>
            {
                nextRace &&
              <SmallText>Race: <LocalTime time={nextRace.startTime}/></SmallText>
            }
        </div>
    )
    return (
        <div>
            Season is over &lt;/3
        </div>
    )
}

const RaceLiveBanner = () => {
    return (
        <span className="absolute top-0 w-full bg-red-900 py-3">Event is live!</span>
    )
}