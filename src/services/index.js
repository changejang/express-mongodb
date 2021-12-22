import authService from "./auth.service";
import taskService from "./task.service";

export default (model) => {
	const { userModel, taskModel } = model;
	return {
		authService: authService(userModel),
		taskService: taskService(taskModel),
	};
};
