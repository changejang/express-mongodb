const { logger } = require("../lib");

class TaskController {
	controller = null;
	constructor(taskService) {
		if (!this.controller) this.controller = this;
		this.taskService = taskService;
		return this.controller;
	}

	async create(req, res, next) {
		logger.info("task Create!");
		let result;
		try {
			result = await this.taskService.create(req.body);
			res.send(result);
		} catch (error) {
			const errorMessage = `task Create Error: ${error}`;
			logger.error(errorMessage);
			return next(errorMessage);
		}
		return result;
	}

	async get(req, res, next) {
		logger.info("Task get!");
		const { skip = 0, limit = 0 } = req.query;
		let result;
		try {
			result = await this.taskService.find({ skip, limit });
			if (result.success === false) res.send(result);
			res.send(result);
		} catch (error) {
			const errorMessage = `Task get Error: ${error}`;
			logger.error(errorMessage);
			return next(errorMessage);
		}
		return result;
	}

	async update(req, res, next) {
		logger.info("Task update!");
		let result;
		try {
			result = await this.taskService.update(req.body);
			res.send(result);
		} catch (error) {
			const errorMessage = `Task update Error: ${error}`;
			logger.error(errorMessage);
			return next(errorMessage);
		}
		return result;
	}

	async delete(req, res, next) {
		logger.info("Task Delete:");
		logger.info(req.params.id);
		const { id } = req.params;
		let result;
		try {
			result = await this.taskService.delete(id);
			res.send(result);
		} catch (error) {
			logger.error(`Error Task delete Error: ${error}`);
			return next(error);
		}
		return result;
	}
}

module.exports = (taskModel) => new TaskController(taskModel);
