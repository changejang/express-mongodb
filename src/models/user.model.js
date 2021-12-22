import mongoose from "mongoose";

const User = new mongoose.Schema(
	{
		name: {
			type: String,
			default: "",
		},
		email: {
			type: String,
			default: "",
		},
		password: {
			type: String,
			default: "",
		},
		role: {
			type: String,
			enum: ["ADMIN", "USER"],
			default: "USER",
		},
		salt: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("User", User);
