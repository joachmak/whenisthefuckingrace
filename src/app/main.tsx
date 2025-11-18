"use client"
import {RaceEvent} from "@/app/utils";
import {BadWord, BigText, RedWord, SmallText} from "@/app/components/TextTypes";
import LocalTime from "@/app/components/LocalTime";
import React, {useEffect, useState} from "react";
import {getRaceData} from "@/app/actions";

interface Props {
    events: RaceEvent[]
}

export default function Main({events}: Props) {
    const [isLive, setIsLive] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [userLocation, setUserLocation] = useState<string>('');
    const timeNow = new Date()
    const nextEvent = events.findLast(event => event.startTime.getTime() <= timeNow.getTime())
    const nextRace = nextEvent?.type === "race" ? undefined : events.findLast(event => event.startTime.getTime() <= timeNow.getTime() && event.type === "race")

    const upcomingEvents = events.filter(e => e.startTime > timeNow)

    const eventConfig = {
        type: nextEvent?.type,
        location: nextEvent?.location,
        timestamp: Date.now()
    }

    if (typeof document !== 'undefined') {
        window.addEventListener('scroll', () => {
            setScrollPosition(window.scrollY);
        });
    }

    useEffect(() => {
        setIsLive(true);
        setInterval(async () => {
            const races = await getRaceData();
            setIsLive(races !== undefined);
        }, 800);
    }, [nextEvent]);

    useEffect(() => {
        setIsLive(!!eventConfig.type)
    }, [eventConfig]);

    useEffect(() => {
        document.addEventListener('DOMSubtreeModified', () => {
            alert("Something on the page has changed")
        })
    }, []);

    useEffect(() => {
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
                },
                (error) => {
                    setUserLocation('Location unavailable')
                }
            )
        }
    }, []);

    console.log(scrollPosition, upcomingEvents)
    if (nextEvent) return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            backgroundColor: '#222',
            color: '#888',
            fontFamily: 'var(--font-main)',
            letterSpacing: '4px'
        }}>
            {isLive && <RaceLiveBanner/>}
            <div tabIndex={1} className="flex flex-col items-center gap-2 justify-center">
                <h3>The next <BadWord>f#cking</BadWord> f1 event is the</h3>
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
            <a href="javascript:window.location.href='http://formula1.com" style={{fontSize: '0.6rem', color: '#555'}}>learn
                more</a>
            {userLocation && <div style={{fontSize: '0.8rem', marginTop: '1rem'}}>Hello from {userLocation}</div>}
            <p>Time of visit: {(new Date()).toLocaleString("NO-nb", {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                fractionalSecondDigits: 3
            })}</p>
            <img src="https://images.immediate.co.uk/production/volatile/sites/3/2023/03/F1-car-spec-5678f0a.jpg"
                 className={" absolute -left-[1800px]"}/>
            <img src="https://images.immediate.co.uk/production/volatile/sites/3/2023/03/F1-car-spec-5678f0a.jpg"
                 className={" absolute -right-[1800px]"}/>
            <button
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px 15px',
                    backgroundColor: '#ff1e1e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    zIndex: 1000,
                    visibility: scrollPosition > 200 ? "visible" : "hidden"
                }}
            >
                ↑ Top
            </button>
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