import * as express from "express";
import {getMetricsCollection} from "../metrics/MetricsCollection";

export const metricsRouter = express.Router();

metricsRouter.get('/', (response, resolve) => {
    const collection = getMetricsCollection();
    response.send({
        jiff: collection.jiff,
        diffsync: collection.diffsync,
        raw: collection.raw
    });
});

metricsRouter.post('/reset', (response, resolve) => {
    getMetricsCollection().reset();
    response.send('ok');
});
