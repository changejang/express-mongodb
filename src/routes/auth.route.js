import { Router } from "express";
import { logger } from "../lib";

const route = Router();

export default ({ app, authController: controller }) => {
	logger.info("Start Auth Router!");
	app.use("/auth", route);

	route.post("/signup", controller.signUp.bind(controller));
	route.post("/signin", controller.signIn.bind(controller));
};
