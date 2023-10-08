import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import useWindowDimensions from "./useWindowDimensions";

interface StyleProps {
    screenWidth: number;
}

const useStyles = createUseStyles({
    container: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        color: "#eee",
        letterSpacing: 5,
        textAlign: "center",
        paddingTop: 40,
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
    liveBanner: {
        width: "100vw",
        background: "linear-gradient(90deg, rgba(196,18,18,1) 0%, rgba(126,5,5,1) 35%, rgba(126,5,5,1) 65%, rgba(196,18,18,1) 100%)",
        position: "fixed",
        top: 0,
        fontSize: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "35px",
    },
    urlNoUnderline: {
        textDecoration: "none",
        color: "white"
    }
});

function App() {
    const screenSize = useWindowDimensions();
    const [nextEventDatetime, setNextEventDatetime] = useState<
        Date | undefined
    >(undefined);
    const [nextEventName, setNextEventName] = useState("");
    const [nextEventType, setNextEventType] = useState("");
    const [err, setErr] = useState(false);
    useEffect(() => {
        const { XMLParser } = require("fast-xml-parser");
        fetch("https://ergast.com/api/f1/" + (new Date()).getFullYear())
            .then((res) => res.text())
            .then((data) => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data, "text/xml");
                const races = xmlDoc.getElementsByTagName("Race");
                let nextRace = undefined
                let nextRaceName = undefined
                let nextRaceDateTime = undefined
                // find next GP
                for (let i = 0; i < races.length; i++) {
                    const raceData = races[i];
                    const parser = new XMLParser();
                    let data = parser.parse(raceData.innerHTML)
                    const datetime = new Date(data["Date"] + "T" + data["Time"])
                    if (datetime > new Date()) {
                        nextRace = data
                        nextRaceDateTime = datetime
                        nextRaceName = data.RaceName.toString()
                            .toLowerCase()
                            .replace('grand prix','')
                        break
                    }
                }
                if (nextRace === undefined) return
                // remove unused tags to simplify next step
                delete nextRace.Time
                delete nextRace.Date
                delete nextRace.RaceName
                delete nextRace.Circuit
                // find next event within GP
                let now = new Date();
                let nextEventKey = null;
                let nextEventDateTime = null;
                for (let key in nextRace) {
                    let eventDateTime = new Date(`${nextRace[key].Date}T${nextRace[key].Time}`);
                    if (eventDateTime > now && (nextEventDateTime === null || eventDateTime < nextEventDateTime)) {
                        nextEventKey = key;
                        nextEventDateTime = eventDateTime;
                    }
                }
                if (nextEventKey === null) {
                    nextEventDateTime = nextRaceDateTime
                    nextEventKey = "Race"
                }
                console.log(nextEventDateTime + " " + nextEventKey + " " + nextRaceName)
                setNextEventDatetime(nextEventDateTime!)
                setNextEventType(nextEventKey)
                setNextEventName(nextRaceName)
            })
            .catch(() => {
                setErr(true);
            });
    }, []);
    const classes = useStyles({ screenWidth: screenSize });
    const time_now = new Date();
    if (time_now.getMonth() >= 10) return (
        // API has just stopped working (I hope it comes back next season) so this is just a temporary solution <3
        <div className={classes.container}>
            <h2>The season has ended, bröther.</h2>
            <img width={150} src={"img/chequered_flag.gif"} alt="chequered flag" />
            <p className={classes.smallTxt}>
                Check out <a className={classes.url} href="https://www.instagram.com/f1troll/">F1troll</a> {" "}
                on instagram for continued F1 entertainment
            </p>
        </div>
    )
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
            {nextEventName && !err && nextEventDatetime && nextEventDatetime <= new Date() &&
                <div className={classes.liveBanner}>
                    <div className="video__icon">
                        <div className="circle--outer"></div>
                        <div className="circle--inner"></div>
                    </div>
                    <a href={"https://f1tv.formula1.com/"} rel="noreferrer" target={"_blank"} className={classes.urlNoUnderline}>
                        F1 event is live! 🔗
                    </a>
                </div>
            }
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
            {nextEventType !== "Race" && nextEventDatetime && (
                <div className={classes.section}>
                    <p className={classes.smallTxt}>
                        (Race starts at{" "}
                        {nextEventDatetime.toLocaleString("no-NO")})
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
