import React, {ReactNode} from "react";

export function SmallText({children}: { children: ReactNode }) {
    return (
        <div className="text-[0.8rem] text-center lg:text-[1.2rem]">{children}</div>
    )
}

export function BigText({children}: { children: ReactNode }) {
    return (
        <div className="lg:text-[5rem] text-center text-[3rem] leading-[3rem] lg:leading-[5rem]">{children}</div>
    )
}

export function BadWord({children}: { children: ReactNode }) {
    return (
        <span className="text-red-300 blur-[2px]">{children}</span>
    )
}

export function RedWord({children}: { children: ReactNode }) {
    return (
        <span className="text-red-300">{children}</span>
    )
}