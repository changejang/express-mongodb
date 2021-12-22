import { logger } from "../lib";
import taskModel from "./task.model";
import userModel from "./user.model";

class Model {
	constructor(model) {
		this.model = model;
	}

	async create({ body }) {
		let result;
		try {
			logger.info(body);
			result = await this.model.create(body);
			return result;
		} catch (error) {
			logger.error(` ${error}`);
			throw new Error(`Error: ${error}`);
		}
	}

	async count({ query }) {
		try {
			// logger.info(` ${}`);
		} catch (error) {
			logger.error(` ${error}`);
			throw new Error(`Error: ${error}`);
		}
	}

	async deleteById({ id: _id }) {
		let result;
		try {
			result = await this.model.deleteOne({ _id });
		} catch (error) {
			logger.error(` ${error}`);
			throw new Error(`Error: ${error}`);
		}
		return result;
	}

	async findDistinct({ query, field }) {
		try {
			// logger.info(` ${}`);
		} catch (error) {
			logger.error(` ${error}`);
			throw new Error(`Error: ${error}`);
		}
	}

	// 문서의 전체 데이터를 선택하는 것이 아니라 필요한 데이터만 선택하는 것을 의미 0이면 안나옴, 1
	async findOne({ query, projection = { __v: 0 }, options = { lean: true } }) {
		let result;
		try {
			result = this.model
				.findOne(query, projection, options)
				.select({ __v: 0 })
				.exec();
		} catch (error) {
			logger.error(`MongDB: findOne: ${error}`);
			throw new Error(`Error: ${error}`);
		}
		return result;
	}

	async find({
		query = {},
		projection = { __v: 0 },
		sort = { id: 1 },
		options = { lean: true },
	}) {
		let result;
		logger.info(
			`model find, ${JSON.stringify(query)}, ${projection}, ${JSON.stringify(
				options,
			)}`,
		);
		try {
			result = await this.model.find(query, projection, options).exec();
		} catch (error) {
			logger.error(`MongDB: find: ${error}`);
			throw new Error(`Error: ${error}`);
		}
		return result;
	}

	async findById({ id, projection = { __v: 0 }, options = { lean: true } }) {
		let result;
		try {
			result = await this.model.findById(id, projection, options).exec();
		} catch (error) {
			logger.error(`MongDB: findById: ${error}`);
			throw new Error(`Error: ${error}`);
		}
		return result;
	}

	async update({ id, body, options = { lean: true, new: true } }) {
		let result;
		try {
			result = this.model.findByIdAndUpdate(id, body, options).exec();
		} catch (error) {
			logger.error(`MongDB: update: ${error}`);
			throw new Error(`Error: ${error}`);
		}
		return result;
	}
}

export default  {
	taskModel: new Model(taskModel),
	userModel: new Model(userModel),
};
