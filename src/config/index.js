const dotenv = require("dotenv");

process.env.NODE_ENV = (process.env.NODE_ENV || "local").toLowerCase();

const evnFound = dotenv.config({
	path: `.${process.env.NODE_ENV}.env`,
});

const {NODE_ENV, PORT, MONGODB_URI, LOG_LEVEL} = process.env;

if (evnFound.error) {
	throw new Error("Couldn't find .env file");
}

export const port = parseInt(PORT, 10);
export const nodeEnv = NODE_ENV.toLowerCase();
export const databaseURL = MONGODB_URI;
export const logs = {
	level: LOG_LEVEL.toLowerCase() || "local",
};

export const api = {
	prefix: "/api",
};

// module.exports = {
// 	port,
// 	nodeEnv,
// 	databaseURL,
// 	logs,
// 	api,
// };
