import { Router } from "express";
import { logger } from "../lib";

const task = require("./task.route");

export default ({ controller }) => {
	logger.info("Start! route!");

	const { taskController } = controller;
	const app = Router();
	task({ app, taskController });
	return app;
};
