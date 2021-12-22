import mongoose from "mongoose";
import config from "../config";
import {logger} from "../lib";

mongoose.Promise = global.Promise;

const mongooseConnection = async () => {
	logger.info("Mongoose loader!");
	try {
		await mongoose.connect(config.databaseURL);
	} catch (error) {
		logger.error(error);
	}
};

export default  mongooseConnection;
