import {ReactNode} from "react";

interface Props {
    children?: ReactNode
}

export default function MainWrapper(props: Props) {
    return (
        <main
            className="flex flex-col items-center lg:gap-[4rem] gap-[2rem] justify-center h-[100vh] box-border p-2 text-center selection:bg-none selection:text-blue-300">
            {props.children}
        </main>
    )
}