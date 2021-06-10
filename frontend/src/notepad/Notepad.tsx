import React, {useEffect, useRef} from "react";
import {SyncAlgo} from "../algos/SyncAlgo";

interface NotepadProps {
    algo: SyncAlgo
}

export const Notepad: React.FC<NotepadProps> = (props: NotepadProps) => {
    const textfield = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: any) => {
        if (textfield.current) {
            console.log(textfield.current.value);
            props.algo.pushUpdate(textfield.current.value);
        }
    }

    const receiveUpdate = (text: string) => {
        if (textfield.current && text) {
            textfield.current.value = text;
        }
    }

    useEffect(() => {
        props.algo.setUpdateHandler(receiveUpdate);

        return () => props.algo.removeUpdateHandler(receiveUpdate);
    }, []);

    return <div>
        <div>Notepad</div>
        <textarea ref={textfield} onChange={handleChange}/>
    </div>;
}
