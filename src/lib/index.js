const error = require("./error.lib");
const logger = require("./logger.lib");

module.exports = {
	...logger,
	...error,
};
