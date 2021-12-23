import jwt from "jsonwebtoken";
import _ from 'lodash';
const { pick } = _;

import argon2 from "argon2";
import { randomBytes } from "crypto";

// import { jwtSecret, jwtAlgo, accessTokenDate } from "../config";
import { logger } from "../lib";

const SIGN_IN_RESULT = ["name", "email", "role", "createdAt", "updatedAt"];
const SIGN_UP_RESULT = ["name", "email", "role"];

class AuthService {
	instance = null;
	constructor(userModel) {
		if (!this.instance) this.instance = this;
		this.userModel = userModel;
		return this.instance;
	}

	async signup(user) {
		logger.info("AuthService Signup");
		let result;
		let success = false;
		try {
			const salt = randomBytes(32);
			const hashedPassword = await argon2.hash(user.password, { salt });
			const userRecord = await this.userModel.create({
				...user,
				salt: salt.toString("hex"),
				password: hashedPassword,
			});

			const token = this.generateToken(userRecord);

			if (userRecord) success = true;
			result = { success, user: pick(userRecord, SIGN_UP_RESULT), token };
		} catch (error) {
			logger.error(error);
			throw error;
		}
		return result;
	}

	async signin(email, password) {
		let result;
		try {
			const userRecord = await this.userModel.findOne({ email });
			if (!userRecord) {
				throw Error("User not registered");
			}
			logger.info("Checking password");
			const validPassword = await argon2.verify(userRecord.password, password);
			if (validPassword) {
				logger.info("Password is valid");
				const token = this.generateToken(userRecord);
				logger.info(userRecord, pick(userRecord, SIGN_IN_RESULT));
				logger.error(pick(userRecord, SIGN_IN_RESULT));

				const user = pick(userRecord, SIGN_IN_RESULT);

				result = { success: true, user, token };
			} else {
				// TODO: 패스워드 안맞을때 처리
				result = { success: false };
				// throw Error('Password is invalid')
			}
			return result;
		} catch (error) {
			logger.error(`Auth Service Signin Error: ${error}`);
			throw Error(`User Signin Error ${error}`);
		}
	}

	generateToken(user) {
		try {
			const today = new Date();
			const exp = new Date(today);
			exp.setDate(today.getDate() + accessTokenDate);
			logger.info(`Sign JWT for userId: ${user._id}`);
			return jwt.sign(
				{
					_id: user._id,
					role: user.role,
					name: user.name,
					exp: exp.getTime() / 1000,
				},
				jwtSecret,
				{
					algorithm: jwtAlgo,
				},
			);
		} catch (error) {
			logger.error(`Auth Service Generate Token Error: ${error}`);
			throw Error(`Auth Service Generate Token Error: ${error}`);
		}
	}

	async refresh() {}
}

export default (userModel) => new AuthService(userModel);
