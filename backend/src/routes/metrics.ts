import * as express from "express";
import {getMetricsCollection} from "../metrics/MetricsCollection";

export const metricsRouter = express.Router();

metricsRouter.get('/', (request, response) => {
    const collection = getMetricsCollection();
    response.send({
        jiff: collection.jiff,
        diffsync: collection.diffsync,
        raw: collection.raw
    });
});

metricsRouter.post('/clear', (request, response) => {
    getMetricsCollection().reset();
    response.send('ok');
});
