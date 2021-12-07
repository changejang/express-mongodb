const { Router } = require("express");
const { logger } = require("../lib");

const route = Router();

module.exports = ({ app, itemController: controller }) => {
	logger.info("Start Item Router!");
	app.use("/item", route);
	/** TODO:
	 * [v] 아이템 생성:
	 * [v] 아이템 가져오기: limit, skip
	 * [] 아이템 수정:
	 * [] 아이템 제거:
	 * TODO: Validation 작업 추가.
	 *
	 *
	 */
	route.get("/", controller.get.bind(controller));
	// route.post('/', createItemValidationRules, validate, controller.create.bind(controller));
	route.post("/", controller.create.bind(controller));
	route.put("/", controller.update.bind(controller));
	route.delete("/:id", controller.delete.bind(controller));
	route.get("/shortId/:id", controller.getByShortId.bind(controller));
	route.get("/:id", controller.getById);
};
