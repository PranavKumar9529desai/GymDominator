import { useRecoilValueLoadable, Loadable } from "recoil";
import { Excercisetype, ExcersiceSelector } from "@state/Selectors/ExcerciseSelectorsfamily";
import { useEffect, useState } from "react";
export const FetchExcercise = ({ muscle }: { muscle: string }) => {
    const Excercises: Loadable<Excercisetype[]> = useRecoilValueLoadable(ExcersiceSelector(muscle));
    const [isLoading, setisLoadig] = useState<boolean>(false);
    const [Excercise, setExcercise] = useState<Excercisetype[]>([]);
    useEffect(() => {
        switch (Excercises.state) {
            case "hasValue":
                setisLoadig(false);
                setExcercise(Excercises.contents);
                break;
            case "loading":
                setisLoadig(true);
                break;
            case "hasError":
                setisLoadig(true);
                throw Excercises.contents;
        }
    }, [Excercises]);

    return { isLoading, Excercise }
}