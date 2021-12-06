// https://sematext.com/blog/node-js-error-handling/
// https://github.com/hagopj13/node-express-boilerplate/blob/master/src/middlewares/auth.js
// const httpStatusCodes = {
//   OK: 200,
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   FORBIDDEN: 403,
//   NOT_FOUND: 404,
//   INTERNAL_SERVER: 500
// };
// 422 Unprocessable Entity (이 응답은 서버가 요청을 이해하고 요청 문법도 올바르지만 요청된 지시를 따를 수 없음을 나타냅니다.)
const status = require("http-status");

class BaseError extends Error {
	constructor(name, statusCode, isOperational, description) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name;
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		Error.captureStackTrace(this);
	}
}

class ApiError extends Error {
	constructor(statusCode, message, isOperational = true) {
		super(message);
		this.name = status[this.statusCode];
		Object.setPrototypeOf(this, new.target.prototype);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		Error.captureStackTrace(this);
	}
}

class Api404Error extends BaseError {
	constructor(
		name,
		statusCode = status.NOT_FOUND,
		description = "Not found.",
		isOperational = true,
	) {
		super(name, statusCode, isOperational, description);
	}
}

// 404 error middleware
const error404 = (req, res, next) => {
	const error = new Api404Error("404 Not Found1");
	error.status = 404;
	next(error);
};

// UnauthorizedError and client Error middleware
const errorMiddleware = (err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		return res.status(err.status).send({message: err.message}).end();
	}
	if (req.xhr) {
		return res.status(500).send({error: "Something failed!"});
	}
	return next(err);
};

const errorHandler = (err, req, res) => {
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
		},
	});
};

function isOperationalError(error) {
	if (error instanceof BaseError) {
		return error.isOperational;
	}
	return false;
}

module.exports = {
	BaseError,
	Api404Error,
	ApiError,
	errorMiddleware,
	errorHandler,
	isOperationalError,
	error404,
};
