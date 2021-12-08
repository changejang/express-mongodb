const { logger } = require("../lib");

class TaskService {
	instance = null;
	constructor(taskModel) {
		if (!this.instance) this.instance = this;
		this.taskModel = taskModel;
		return this.instance;
	}

	async create({ body }) {
		logger.info("Task Service Create!");
		let result;
		let success = false;
		try {
			const data = await this.itemModel.create({ body });
			if (data) success = true;
			result = { success, data };
		} catch (error) {
			const errorMessage = `Create ${error}`;
			logger.error(errorMessage);
			throw new Error(errorMessage);
		}
		return result;
	}

	async update({ body, id }) {
		logger.info(`Task Service update!${id}: ${body}`);
		let result;
		let success = false;
		try {
			const data = await this.taskModel.update({ id, body });
			result = { success, data };
		} catch (error) {
			const errorMessage = `Update ${error}`;
			logger.error(errorMessage);
			throw new Error(errorMessage);
		}
		return result;
	}

	async delete({ id }) {
		logger.info(`Task Service delete! ${id}`);
		let result;
		let success = false;
		try {
			const data = await this.taskModel.deleteById({ id });
			if (data) success = true;
			result = { success, data };
		} catch (error) {
			const errorMessage = `Delete: ${error}`;
			logger.error(errorMessage);
			throw new Error(errorMessage);
		}
		return result;
	}

	async find({ skip = 0, limit = 0, id = null }) {
		logger.info("Task Service find!", id);
		let result;
		let success = false;
		try {
			const data = await this.taskModel.find({
				query: {},
				projection: null,
				sort: null,
				options: { limit: Number(limit), skip: Number(skip) },
			});
			if (data) success = true;
			result = { success, data };
		} catch (error) {
			const errorMessage = `Find ${error}`;
			logger.error(errorMessage);
			throw new Error(errorMessage);
		}
		return result;
	}

	async findById(id) {
		logger.info("Task Service findById!");
		let result;

		try {
			const data = await this.taskModel.findById({ id });
			result = { success: true, data };
		} catch (error) {
			logger.error(`Error!: ${error}`);
			result = { success: false, error };
		}
		return result;
	}
}

module.exports = (taskModel) => new TaskService(taskModel);
