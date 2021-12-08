const { Router } = require("express");
const { logger } = require("../lib");

const task = require("./task.route");

module.exports = ({ controller }) => {
	logger.info("Start! route!");

	const { taskController } = controller;
	const app = Router();
	task({ app, taskController });
	return app;
};
