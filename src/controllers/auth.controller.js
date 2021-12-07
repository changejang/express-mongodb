const { logger } = require("../lib");

class AuthController {
	instance = null;
	constructor(authService) {
		if (!this.instance) this.instance = this;
		this.authService = authService;
		return this.instance;
	}

	async signUp(req, res, next) {
		logger.info(`Calling Sign-up endpoint with body: ${req.body}`);
		try {
			const { user, token } = await this.authService.signup(req.body);
			return res.status(201).json({ user, token });
		} catch (error) {
			logger.error(`Error SignUp: ${error}`);
			return next(error);
		}
	}

	async signIn(req, res, next) {
		logger.info(`Calling Sign-in endpoint with body: ${req.body}`);
		try {
			const { email, password } = req.body;
			const { user, token } = await this.authService.signin(email, password);
			return res.json({ user, token }).status(200);
		} catch (error) {
			logger.error(`Error SignIn: ${error}`);
			return next(error);
		}
	}

	async logout(req, res, next) {
		logger.info(`Calling Sign-out endpoint with body: ${req.body}`);
		try {
			// TODO: logout
			return res.status(200).end();
		} catch (error) {
			logger.error(`Error logout: ${error}`);
			return next(error);
		}
	}

	async me() {}
	async refresh() {}
}

module.exports = (authService) => new AuthController(authService);
