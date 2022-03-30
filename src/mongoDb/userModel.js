const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userlogin: {
        username: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required:true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required:true
        }
    },
    watchlist: [{
        stock_name: {
            type: String
        }
    }],
    portfolio: [{
        stock_name: {
            type:String
        },
        buying_price: {
            type:Number
        },
        buying_date: {
            type:String
        }
    }]
});

const userdata = new mongoose.model("user-data", userSchema);

module.exports = userdata;