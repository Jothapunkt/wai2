import React, {useState} from "react";
import {StatColumn} from "./StatColumn";

export const MetricsDashboard: React.FC = (props) => {
    const [metrics, setMetrics] = useState<any>(undefined);

    const fetchMetrics = () => {
        fetch('http://localhost:7200/metrics')
            .then(metrics => {
                setMetrics(metrics);
            })
            .catch(console.log);
    }

    const clearMetrics = () => {
        fetch('http://localhost:7200/metrics/clear', {method: 'POST'})
            .then(() => console.log('cleared'))
            .catch(console.log);
    }

    if (!metrics) {
        return <div/>;
    }

    const raw = metrics.raw.total;

    const jiffClient = metrics.jiff.clientsSent;
    const jiffServer = metrics.jiff.serverSent;

    const jiffTotal = jiffClient + jiffServer;

    const diffsyncClient = metrics.diffsync.clientsSent;
    const diffsyncServer = metrics.diffsync.serverSent;

    const diffsyncTotal = diffsyncClient + diffsyncServer;

    return <div>
        <StatColumn color={'#990099'} filledPercent={(diffsyncTotal / raw) * 100} label={"Diffsync (Total)"}/>
        <StatColumn color={'#009933'} filledPercent={(jiffTotal / raw) * 100} label={"Jiff (Total)"}/>
        <StatColumn color={'#cc3300'} filledPercent={100} label={"Total"}/>
    </div>;
}
