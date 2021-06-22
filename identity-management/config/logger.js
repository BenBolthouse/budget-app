const { createLogger, transports, format } = require('winston');
const morgan = require('morgan');
const colors = require('colors');

/**
 * All-purpose console transport logger based on winston.
 */
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => {
      let logLevelText;

      switch (info.level) {
        case 'debug':
          logLevelText = info.level.blue;
          break;

        case 'info':
          logLevelText = info.level.green;
          break;

        case 'warn':
          logLevelText = info.level.yellow;
          break;

        case 'error':
          logLevelText = info.level.red;
          break;

        default:
          logLevelText = info.level.white;
          break;
      }

      return `${info.timestamp.yellow} ${logLevelText}: ${info.message}`;
    }),
  ),
  transports: [new transports.Console()],
});

logger.stream = {
  write: (message) => logger.info(message.substring(0, message.lastIndexOf('\n'))),
};

/**
 * Morgan output added to logger stream, for replacement in app.use(...)
 * middleware.
 */
const httpLogger = morgan(
  ':method :url :status :response-time ms - :res[content-length]'.gray,
  { stream: logger.stream },
);

module.exports = { logger, httpLogger };
