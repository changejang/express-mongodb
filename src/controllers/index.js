const authController = require("./auth.controller");
const taskController = require("./task.controller");

module.exports = (service) => {
	const { authService, taskService } = service;
	return {
		authController: authController(authService),
		taskController: taskController(taskService),
	};
};
