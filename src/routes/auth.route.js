const { Router } = require("express");
const { logger } = require("../lib");

const route = Router();

module.exports = ({ app, authController: controller }) => {
	logger.info("Start Auth Router!");
	app.use("/auth", route);

	route.post("/signup", controller.signUp.bind(controller));
	route.post("/signin", controller.signIn.bind(controller));
};
