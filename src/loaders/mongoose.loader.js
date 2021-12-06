const mongoose = require("mongoose");
const config = require("../config");
const {logger} = require("../lib");

mongoose.Promise = global.Promise;

const mongooseConnection = async () => {
	logger.info("Mongoose loader!");
	try {
		await mongoose.connect(config.databaseURL);
	} catch (error) {
		logger.error(error);
	}
};

module.exports = mongooseConnection;
