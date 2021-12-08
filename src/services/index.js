const authService = require("./auth.service");
const taskService = require("./task.service");

module.exports = (model) => {
	const { userModel, taskModel } = model;
	return {
		authService: authService(userModel),
		taskService: taskService(taskModel),
	};
};
