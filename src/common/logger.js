const log = (...args) => {
    console.log(...args);
};

const info = (...args) => {
    console.log('# logger.info(): ');
    console.log(...args);
};

const error = (message, error) => {
    console.log('# logger.error(): ');
    console.log(message, error);
};

export const logger = {
    log,
    info,
    error
};
