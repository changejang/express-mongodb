const winston = require("winston");

const config = require("../config");

const transports = [];
const logLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		sql: 4,
		debug: 5,
		dev: 6,
	},
	colors: {
		error: "red",
		warn: "darkred",
		info: "red",
		http: "green",
		sql: "blue",
		debug: "gray",
		dev: "yellow",
	},
};
winston.addColors(logLevels.colors);

if (
	process.env.NODE_ENV !== "development" &&
	process.env.NODE_ENV !== "local"
) {
	transports.push(new winston.transports.Console());
} else {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.cli(),
				winston.format.splat(),
				winston.format.timestamp({
					format: "YY-MM-DD HH:mm:ss",
				}),
				winston.format.errors({stack: true}),
				winston.format.json(),
				winston.format.splat(),
				winston.format.colorize(),
				winston.format.simple(),
				//   winston.format.printf((info) => {
				//   let { timestamp, level, stack, message } = info;
				//   message = stack || message;
				//   return `${timestamp} ${level}: ${message}`;
				// }),
			),
		}),
	);
}

const logger = winston.createLogger({
	level: config.logs.level,
	levels: logLevels.levels,
	transports,
});

module.exports = {
	logger,
};
