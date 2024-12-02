"use client"

interface Props {
    time: Date
}

export default function LocalTime(props: Props) {
    return (
        <>{props.time.toLocaleString("nb-NB")}</>
    )
}