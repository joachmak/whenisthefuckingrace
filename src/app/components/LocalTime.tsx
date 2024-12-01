"use client"

interface Props {
    time: Date
    locale: string
}

export default function LocalTime(props: Props) {
    return (
        <>{props.time.toLocaleString(props.locale)}</>
    )
}