export interface RaceEvent {
    location: string
    type: "race" | "first practice" | "second practice" | "third practice" | "sprint qualifying" | "sprint" | "qualifying"
    startTime: Date
    endTime: Date
}

export interface RawEventData {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: {
        circuitId: string
        url: string
        circuitName: string
        Location: {
            lat: string
            long: string
            locality: string
            country: string
        }
    }
    date: string
    time: string
    FirstPractice?: { date: string, time: string }
    SecondPractice?: { date: string, time: string }
    ThirdPractice?: { date: string, time: string }
    SprintQualifying?: { date: string, time: string }
    Sprint?: { date: string, time: string }
    Qualifying?: { date: string, time: string }
}

const getDate = (dateObj?: {
    date: string,
    time: string
}) => dateObj ? new Date(dateObj.date + "T" + dateObj.time) : undefined

const addHoursToDate = (date: Date, hours: number = 2): Date => {
    return new Date(date.getTime() + (hours * 60 * 60 * 1000))
}

export const getEventsFromRawData = (races: RawEventData[]): RaceEvent[] => {
    const events: RaceEvent[] = []

    races.forEach(race => {
        const location = race.raceName.toLowerCase().replace("grand prix", "")

        const raceTime = new Date(race.date + "T" + race.time)
        const firstPracticeTime = getDate(race.FirstPractice)
        const secondPracticeTime = getDate(race.SecondPractice)
        const thirdPracticeTime = getDate(race.ThirdPractice)
        const sprintQualiTime = getDate(race.SprintQualifying)
        const sprintTime = getDate(race.Sprint)
        const qualiTime = getDate(race.Qualifying)

        events.push({location: location, type: "race", startTime: raceTime, endTime: addHoursToDate(raceTime)})
        if (firstPracticeTime)
            events.push({
                location: location,
                type: "first practice",
                startTime: firstPracticeTime,
                endTime: addHoursToDate(firstPracticeTime)
            })
        if (secondPracticeTime)
            events.push({
                location: location,
                type: "second practice",
                startTime: secondPracticeTime,
                endTime: addHoursToDate(secondPracticeTime)
            })
        if (thirdPracticeTime)
            events.push({
                location: location,
                type: "third practice",
                startTime: thirdPracticeTime,
                endTime: addHoursToDate(thirdPracticeTime)
            })
        if (sprintQualiTime)
            events.push({
                location: location,
                type: "sprint qualifying",
                startTime: sprintQualiTime,
                endTime: addHoursToDate(sprintQualiTime)
            })
        if (sprintTime)
            events.push({
                location: location,
                type: "sprint",
                startTime: sprintTime,
                endTime: addHoursToDate(sprintTime)
            })
        if (qualiTime)
            events.push({
                location: location,
                type: "qualifying",
                startTime: qualiTime,
                endTime: addHoursToDate(qualiTime)
            })
    })
    events.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    return events
}