import React from "react";

interface Props {
    color: string,
    filledPercent: number,
    label: string
}

export const StatColumn: React.FC<Props> = (props: Props) => {
    return <div className="stat-column">
        <div className="column-outline">
            <div style={{height: props.filledPercent + '%', backgroundColor: props.color}} className="column-fill"/>
        </div>
        <span style={{color: props.color}}>{ props.label }</span>
    </div>
}
