const authController = require("./auth.controller");
const taskController = require("./task.controller");

module.exports = (service) => ({
	authController: authController(service.authService),
	taskController: taskController(service.taskService),
});
