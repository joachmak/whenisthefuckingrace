'use client'

import {useEffect} from 'react'
import MainWrapper from "@/app/components/MainWrapper";
import {BigText, RedWord, SmallText} from "@/app/components/TextTypes";
import Link from "next/link";

export default function Error({error}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <MainWrapper>
            <BigText><RedWord>FUCK</RedWord></BigText>
            <SmallText>
                This is not the time to censor swearwords, something went really{" "}
                <span className="text-red-300">fucking</span> wrong.
            </SmallText>
            <SmallText>Try refreshing the page.</SmallText>
            <SmallText>
                Didn&apos;t work?{" "}
                <RedWord>Shit</RedWord>, I guess
                we&apos;ll have to learn about timezones.
            </SmallText>
            <Link
                href="https://en.wikipedia.org/wiki/Time_zone"
                className="underline"
                target="_blank"
            >
                https://en.wikipedia.org/wiki/Time_zone
            </Link>
        </MainWrapper>
    )
}