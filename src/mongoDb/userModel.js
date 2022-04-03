const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	userlogin: {
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	watchlist: [],
	portfolio: [],
});

const UserModel = new mongoose.model("user-data", userSchema);

module.exports = UserModel;
