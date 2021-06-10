import React, {useRef} from "react";
import {SyncAlgo} from "../algos/SyncAlgo";

interface NotepadProps {
    algo: SyncAlgo
}

export const Notepad: React.FC<NotepadProps> = (props: NotepadProps) => {
    const textfield = useRef<HTMLTextAreaElement>(null);

    return <div>
        <div>Notepad</div>
        <textarea ref={textfield}/>
    </div>;
}
