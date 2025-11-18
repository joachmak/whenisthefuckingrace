'use server'
import raceData from './response.json'
import {RawEventData} from "@/app/utils";

export async function getRaceData(): Promise<RawEventData[]> {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const races = raceData.MRData.RaceTable.Races.map(race => {
        const settimezone = (dateStr: string, timeStr: string) => {
            const date = new Date(dateStr + 'T' + timeStr)
            date.setHours(date.getHours() + 4)
            return {
                date: date.toISOString().split('T')[0],
                time: date.toISOString().split('T')[1]
            }
        }

        const time = settimezone(race.date, race.time)

        return {
            ...race,
            date: time.date,
            time: time.time,
            FirstPractice: race.FirstPractice ? {...race.FirstPractice, ...settimezone(race.FirstPractice.date, race.FirstPractice.time)} : undefined,
            SecondPractice: race.SecondPractice ? {...race.SecondPractice, ...settimezone(race.SecondPractice.date, race.SecondPractice.time)} : undefined,
            ThirdPractice: race.ThirdPractice ? {...race.ThirdPractice, ...settimezone(race.ThirdPractice.date, race.ThirdPractice.time)} : undefined,
            SprintQualifying: race.SprintQualifying ? {...race.SprintQualifying, ...settimezone(race.SprintQualifying.date, race.SprintQualifying.time)} : undefined,
            Sprint: race.Sprint ? {...race.Sprint, ...settimezone(race.Sprint.date, race.Sprint.time)} : undefined,
            Qualifying: race.Qualifying ? {...race.Qualifying, ...settimezone(race.Qualifying.date, race.Qualifying.time)} : undefined,
        }
    })

    return races as RawEventData[]
}
