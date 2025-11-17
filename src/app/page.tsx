"use server"
import React from "react";
import MainWrapper from "@/app/components/MainWrapper";
import {getEventsFromRawData} from "@/app/utils";
import Main from "@/app/main";
import {getRaceData} from "@/app/actions";

export default async function Home() {
    const races = await getRaceData()
    const events = getEventsFromRawData(races)

    return (
        <MainWrapper>
            <Main events={events}/>
        </MainWrapper>
    );
}
