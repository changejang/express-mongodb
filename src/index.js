import express from "express";

import { port } from "./config";
import { load } from "./loaders";
import { logger }from"./lib";

const startServer = async () => {
	logger.info(`Start Server! ${port}`);
	const app = express();
	await load({
		expressApp: app,
	});
	app.listen(port, (err) => {
		if (err) {
			logger.error(err);
			process.exit(1);
		}
		logger.info(`Server listening on port: ${port}`);
	});
};

(async () => {
	await startServer();
})();
