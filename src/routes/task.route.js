const { Router } = require("express");
const { logger } = require("../lib");

const route = Router();

module.exports = ({ app, taskController: controller }) => {
	logger.info("Start Item Router!");
	app.use("/task", route);

	route.get("/", controller.get.bind(controller));
	route.post("/", controller.create.bind(controller));
	route.put("/", controller.update.bind(controller));
	route.delete("/:id", controller.delete.bind(controller));
	route.get("/shortId/:id", controller.getByShortId.bind(controller));
	route.get("/:id", controller.getById);
};
