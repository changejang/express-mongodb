const expressLoader = require("./express.loader");
const mongooseLoader = require("./mongoose.loader");
const { logger } = require("../lib");

const load = async ({ expressApp }) => {
	logger.info("DB");
	await expressLoader({ app: expressApp });
	await mongooseLoader();
	logger.info("Express loaded");
};

module.exports = {
	load,
};
