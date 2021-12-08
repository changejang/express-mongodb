const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const ShortUniqueId = require("short-unique-id");

const createShortId = new ShortUniqueId({ length: 5 });

const Task = new mongoose.Schema(
	{
		name: {
			type: String,
			default: "",
		},
		parent: {
			type: ObjectId,
		},
		content: {
			type: String,
			default: "",
		},
		priority: {
			type: Number,
			default: 0,
		},
		tags: {
			type: [ObjectId],
		},
		shortId: {
			type: String,
		},
		todoData: {
			type: Date,
		},
		doneDate: {
			type: Date,
		},
	},
	{
		timestamps: true,
	},
);

Task.pre("save", function save(next) {
	const shortId = createShortId();
	this.set({ shortId });
	next();
});

module.exports = mongoose.model("Task", Task);
