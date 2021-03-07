const error = {
	eventName:'error',
        logDirectory:'./logs',
        fileNamePattern:'app-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};

const info = {
	eventName:'info',
        logDirectory:'./logs',
        fileNamePattern:'app-<DATE>.log',
        dateFormat:'YYYY.MM.DD',
};

const api = {
	eventName:'api',
        logDirectory:'./logs',
        fileNamePattern:'API-REST-<DATE>.log',
        dateFormat:'YYYY.MM.DD',
};

export async function logError(msg: string)
{
    const log = await require('simple-node-logger').createRollingFileLogger(error);
    return log.error(msg, new Date());
}

export async function logInfo(msg: string)
{
    const log = await require('simple-node-logger').createRollingFileLogger(info);
    return log.info(msg, new Date());
}

export async function logApi(msg: string)
{
    const log = await require('simple-node-logger').createRollingFileLogger(api);
    return log.info(msg, new Date());
}
