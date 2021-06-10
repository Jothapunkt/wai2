class MetricsCollection {
    // Total amount of traffic sent by parties (in bytes)
    diffsync = {
        clientsSent: 0,
        serverSent: 0
    };

    jiff =  {
        clientsSent: 0,
        serverSent: 0
    };

    raw = {
        total: 0
    }

    reset() {
        this.diffsync.clientsSent = 0;
        this.diffsync.serverSent = 0;

        this.jiff.clientsSent = 0;
        this.jiff.serverSent = 0;

        this.raw.total = 0;
    }
}

const metricsCollection = new MetricsCollection();

export const getMetricsCollection = (): MetricsCollection => {
    return metricsCollection;
}
