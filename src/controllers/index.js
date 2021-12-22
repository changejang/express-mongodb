import authController from "./auth.controller";
import taskController from "./task.controller";

export default  (service) => {
	const { authService, taskService } = service;
	return {
		authController: authController(authService),
		taskController: taskController(taskService),
	};
};
