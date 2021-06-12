import React, {useEffect, useState} from "react";
import {StatColumn} from "./StatColumn";

import "./MetricsCollection.css";

export const MetricsDashboard: React.FC = (props) => {
    const [metrics, setMetrics] = useState<any>(undefined);

    const format = (bytes: number) => {
        if (bytes < 100) {
            return bytes + 'B';
        }

        if (bytes < 100000) {
            return (bytes / 1000).toFixed(2) + 'kB';
        }

        if (bytes < 100000000) {
            return (bytes / 1000000).toFixed(2) + 'MB';
        }

        if (bytes < 100000000000) {
            return (bytes / 1000000000).toFixed(2) + 'GB';
        }

        return (bytes / 1000000000000).toFixed(2) + 'TB';
    }

    const fetchMetrics = () => {
        fetch('http://localhost:7200/metrics')
            .then(response => {
                response.json()
                    .then(metrics => {
                        setMetrics(metrics);
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }

    const clearMetrics = () => {
        fetch('http://localhost:7200/metrics/clear', {method: 'POST'})
            .then(() => console.log('cleared'))
            .catch(console.log);
    }

    useEffect(() => {
        const interval = setInterval(fetchMetrics, 250);
        return () => clearInterval(interval);
    })

    if (!metrics) {
        return <div>Fetching...</div>;
    }

    const raw = metrics.raw.total / 2;

    const jiffClient = metrics.jiff.clientsSent;
    const jiffServer = metrics.jiff.serverSent;

    const jiffTotal = jiffClient + jiffServer;

    const diffsyncClient = metrics.diffsync.clientsSent;
    const diffsyncServer = metrics.diffsync.serverSent;

    const diffsyncTotal = diffsyncClient + diffsyncServer;

    const highestTotal = Math.max(jiffTotal, diffsyncTotal, raw, 1);

    let jsonDisplay = JSON.stringify(metrics, (key, value) => {
        console.log(key, value);
        if (typeof value === 'number') {
            return format(value);
        } else {
            return value;
        }
    }, 4);

    jsonDisplay = jsonDisplay.replaceAll(': {', ': {');

    return <div>
        <div className="json-display">{jsonDisplay}</div>
        <div className="total-display">
            <StatColumn color={'#990099'} filledPercent={(diffsyncTotal / highestTotal) * 100} label={"Diffsync (Total): " + format(diffsyncTotal)}/>
            <StatColumn color={'#009933'} filledPercent={(jiffTotal / highestTotal) * 100} label={"Jiff (Total): " + format(jiffTotal)}/>
            <StatColumn color={'#cc3300'} filledPercent={(raw / highestTotal) * 100} label={"Total: " + format(raw)}/>
        </div>
        <div className="route-button" onClick={clearMetrics}>Clear</div>
    </div>;
}
