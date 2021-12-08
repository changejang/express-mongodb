const cors = require("cors");
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { api, nodeEnv } = require("../config");
const controllers = require("../controllers");
const { logger, errorMiddleware, error404, errorHandler } = require("../lib");
const models = require("../models");
const routes = require("../routes");
const services = require("../services");

module.exports = async ({ app }) => {
	logger.info("Express loader!");

	app.get("/status", (req, res) => {
		res.status(200).end();
	});

	app.head("/status", (req, res) => {
		res.status(200).end();
	});

	// PUT, DELETE 사용
	app.use(methodOverride());
	app.use(express.json());
	// true 를 하면 qs 모듈을 사용하고, false 면 query-string 모듈을 사용한다.
	app.use(express.urlencoded({ extended: true }));
	app.enable("trust proxy");
	app.use(cors());

	if (nodeEnv === "local") {
		const options = {
			swaggerDefinition: {
				info: {
					title: "REST API",
					version: "1.0.0",
					description: "Example docs",
				},
			},
			apis: ["swagger.yaml"],
		};

		const specs = swaggerJSDoc(options);
		// app.use(morgan('combined'));
		app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
	} else {
		app.use(morgan("combined"));
	}

	logger.info(`router: ${api.prefix}`);

	// 의존성을 여기서 주입!
	const service = services(models);
	const controller = controllers(service);
	app.use(api.prefix, routes({ controller }));

	// Error Handling
	app.use(error404);
	app.use(errorMiddleware);
	app.use(errorHandler);
};
