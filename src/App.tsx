import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import useWindowDimensions from "./useWindowDimensions";

interface Event {
    eventName: string; // fp1/fp2/...
    datetime?: Date; // can be undefined for sprint races
}

interface StyleProps {
    screenWidth: number;
}

const getEventDatetime = (el: Element) => {
    if (el === undefined) return undefined;
    const date = el.getElementsByTagName("Date")[0].textContent;
    const time = el.getElementsByTagName("Time")[0].textContent;
    return new Date(date + "T" + time);
};

const getRaceDatetime = (date: string, time: string) => {
    return new Date(date + "T" + time);
};

const useStyles = createUseStyles({
    container: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        color: "#eee",
        letterSpacing: 5,
        textAlign: "center",
        paddingTop: 20,
    },
    smallTxt: {
        fontSize: (props: StyleProps) => {
            if (props.screenWidth < 1000) return "0.7em";
            return "1.1em";
        },
        fontFamily: "AdamCgPro",
        margin: "10px 0",
        lineHeight: 1.5,
    },
    largeTxt: {
        fontFamily: "AdamCgPro",
        fontSize: (props: StyleProps) => {
            if (props.screenWidth < 1000) return "3em";
            return "5em";
        },
        fontWeight: "bold",
        textTransform: "uppercase",
        margin: "10px 0",
    },
    swearwordBlur: {
        color: "rgb(255, 176, 176)",
        filter: "blur(2px)",
    },
    redWord: {
        color: "rgb(255, 176, 176)",
    },
    section: {
        margin: "20px 0",
    },
    url: {
        color: "white",
        wordBreak: "break-all",
    },
});

function App() {
    const screenSize = useWindowDimensions();
    const [nextEventDatetime, setNextEventDatetime] = useState<
        Date | undefined
    >(undefined);
    const [nextEventName, setNextEventName] = useState("");
    const [nextEventType, setNextEventType] = useState("");
    const [raceEvent, setRaceEvent] = useState<Event>();
    const [err, setErr] = useState(false);
    useEffect(() => {
        fetch("https://ergast.com/api/f1/current")
            .then((res) => res.text())
            .then((data) => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data, "text/xml");
                const races = xmlDoc.getElementsByTagName("Race");
                const time_now = new Date();
                for (let i = 0; i < races.length; i++) {
                    // FIND NEXT GP
                    const raceData = races[i];
                    const racename =
                        raceData.getElementsByTagName("RaceName")[0]
                            .textContent;
                    const raceDate =
                        raceData.getElementsByTagName("Date")[0].textContent;
                    const raceTime =
                        raceData.getElementsByTagName("Time")[0].textContent;
                    const raceDatetime = getRaceDatetime(raceDate!, raceTime!);
                    if (raceDatetime < time_now) continue;
                    // FIND NEXT EVENT WITHIN GP
                    const race: Event = {
                        eventName: "Race",
                        datetime: raceDatetime,
                    };
                    const fp1: Event = {
                        eventName: "First Practice",
                        datetime:
                            getEventDatetime(
                                raceData.getElementsByTagName(
                                    "FirstPractice"
                                )[0]
                            ) || undefined,
                    };
                    const fp2: Event = {
                        eventName: "Second Practice",
                        datetime:
                            getEventDatetime(
                                raceData.getElementsByTagName(
                                    "SecondPractice"
                                )[0]
                            ) || undefined,
                    };
                    const fp3: Event = {
                        eventName: "Third Practice",
                        datetime:
                            getEventDatetime(
                                raceData.getElementsByTagName(
                                    "ThirdPractice"
                                )[0]
                            ) || undefined,
                    };
                    const quali: Event = {
                        eventName: "Qualifying",
                        datetime:
                            getEventDatetime(
                                raceData.getElementsByTagName("Qualifying")[0]
                            ) || undefined,
                    };
                    const sprintTag =
                        raceData.getElementsByTagName("Sprint")[0];
                    const sprint: Event = {
                        eventName: "Sprint",
                        datetime: getEventDatetime(sprintTag),
                    };
                    const eventArr = [fp1, fp2, fp3, quali, sprint, race].filter(event => event.datetime !== undefined);
                    setRaceEvent(race);
                    eventArr.sort((a, b) => {
                        if (a.datetime === undefined) return -1;
                        if (b.datetime === undefined) return 1;
                        if (a.datetime > b.datetime) return 1;
                        return -1;
                    });
                    for (let i = 0; i < eventArr.length; i++) {
                        if (
                            eventArr[i].datetime === undefined ||
                            eventArr[i].datetime! < time_now
                        )
                            continue;
                        setNextEventName(racename!);
                        setNextEventType(eventArr[i].eventName);
                        setNextEventDatetime(eventArr[i].datetime);
                        break;
                    }
                    break;
                }
            })
            .catch(() => {
                setErr(true);
            });
    }, []);
    const classes = useStyles({ screenWidth: screenSize });
    return (
        <div className={classes.container}>
            {err && (
                <div className={classes.section}>
                    <h2
                        className={[classes.largeTxt, classes.redWord].join(
                            " "
                        )}
                    >
                        FUCK
                    </h2>
                    <p className={classes.smallTxt}>
                        No time for censorship, something went really{" "}
                        <span className={classes.redWord}>fucking</span> wrong.
                    </p>
                    <p className={classes.smallTxt}>Try refreshing the page.</p>
                    <p className={classes.smallTxt}>
                        Didn't work?{" "}
                        <span className={classes.redWord}>Shit</span>, I guess
                        we'll have to learn about timezones.
                    </p>
                    <a
                        className={classes.url}
                        href="https://en.wikipedia.org/wiki/Time_zone"
                    >
                        https://en.wikipedia.org/wiki/Time_zone
                    </a>
                </div>
            )}
            <div className={classes.section}>
                {nextEventName && !err ? (
                    <>
                        <p className={classes.smallTxt}>
                            The next{" "}
                            <span className={classes.swearwordBlur}>
                                f#cking
                            </span>{" "}
                            F1 event is the{" "}
                        </p>
                        <h2 className={classes.largeTxt}>
                            {nextEventName.replace("Grand Prix", "")}
                        </h2>
                        <p className={classes.smallTxt}>
                            Grand{" "}
                            <span className={classes.swearwordBlur}>
                                f#cking
                            </span>{" "}
                            Prix
                        </p>
                    </>
                ) : (
                    <>{!err && "..."}</>
                )}
            </div>
            <div className={classes.section}>
                {nextEventType && !err ? (
                    <>
                        <p className={classes.smallTxt}>
                            It's gonna be a{" "}
                            <span className={classes.swearwordBlur}>
                                f#cking
                            </span>
                        </p>
                        <h2 className={classes.largeTxt}>{nextEventType}</h2>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className={classes.section}>
                {nextEventDatetime && !err ? (
                    <>
                        <p className={classes.smallTxt}>It's gonna start at</p>
                        <h2 className={classes.largeTxt}>
                            {nextEventDatetime.toLocaleString("no-NO")}
                        </h2>
                        <p className={classes.smallTxt}>
                            and{" "}
                            <b>
                                <i className={classes.redWord}>NOT</i>
                            </b>{" "}
                            the weird{" "}
                            <span className={classes.swearwordBlur}>
                                f#cking
                            </span>{" "}
                            time they display at formula1.com
                        </p>
                    </>
                ) : (
                    ""
                )}
            </div>
            {nextEventType !== "Race" && raceEvent && (
                <div className={classes.section}>
                    <p className={classes.smallTxt}>
                        (Race starts at{" "}
                        {raceEvent.datetime?.toLocaleString("no-NO")})
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
