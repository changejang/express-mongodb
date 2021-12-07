const { logger } = require("../lib");

class ItemController {
	controller = null;
	constructor(itemService) {
		if (!this.controller) this.controller = this;
		this.itemService = itemService;
		return this.controller;
	}

	async create(req, res, next) {
		logger.info("Item Create!");
		let result;
		try {
			result = await this.itemService.create(req.body);
			res.send(result);
		} catch (error) {
			const errorMessage = `Item Create Error: ${error}`;
			logger.error(errorMessage);
			return next(errorMessage);
		}
		return result;
	}

	async get(req, res, next) {
		logger.info("Item get!");
		const { skip = 0, limit = 0 } = req.query;
		let result;
		try {
			result = await this.itemService.find({ skip, limit });
			if (result.success === false) res.send(result);
			res.send(result);
		} catch (error) {
			const errorMessage = `Item get Error: ${error}`;
			logger.error(errorMessage);
			return next(errorMessage);
		}
		return result;
	}

	async update(req, res, next) {
		logger.info("Item update!");
		let result;
		try {
			result = await this.itemService.update(req.body);
			res.send(result);
		} catch (error) {
			const errorMessage = `Item update Error: ${error}`;
			logger.error(errorMessage);
			return next(errorMessage);
		}
		return result;
	}

	async delete(req, res, next) {
		logger.info("Item Delete:");
		logger.info(req.params.id);
		const { id } = req.params;
		let result;
		try {
			result = await this.itemService.delete(id);
			res.send(result);
		} catch (error) {
			logger.error(`Error Item delete Error: ${error}`);
			return next(error);
		}
		return result;
	}
}

module.exports = (itemModel) => new ItemController(itemModel);
