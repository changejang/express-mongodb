const { Router } = require("express");
const { logger } = require("../lib");

const task = require("./task.route");

module.exports = ({ controller }) => {
	logger.info("Start! route!");

	const { itemController } = controller;
	const app = Router();
	task({ app, itemController });
	return app;
};
