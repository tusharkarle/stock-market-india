// var API = require('indian-stock-exchange');
var express = require("express");
var API = require("./index");
require("./src/mongoDb/dbConnection");
const userModel = require("./src/mongoDb/userModel");

var BSEAPI = API.BSE;
var NSEAPI = API.NSE;
const PORT = process.env.PORT || 3000;

var app = express();
app.use((req, res, next) => {
	res.setHeader("Acces-Control-Allow-Origin", "*");
	res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	res.setHeader(
		"Acces-Contorl-Allow-Methods",
		"Content-Type",
		"Authorization"
	);
	next();
});

let cors = require("cors");
const { json } = require("express");
app.use(cors());
// app.use(express.json());

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});

// National Stock Exchange (NSE) APIS

// Get the stock market status (open/closed) - JSON
// Example: http://localhost:3000/get_market_status
app.get("/get_market_status", (req, res, next) => {
	NSEAPI.getMarketStatus().then(function (response) {
		res.json(response.data);
	});
});

// Get the NSE indexes information (last updated, name, previous close, open, low, high, last, percent change, year high and low, index order) - JSON
// Example: http://localhost:3000/nse/get_indices
app.get("/nse/get_indices", (req, res, next) => {
	NSEAPI.getIndices().then(function (response) {
		res.json(response.data);
	});
});

// Get the quotes of all indexes in NSE - HTML
// Example: http://localhost:3000/nse/get_quotes
app.get("/nse/get_quotes", (req, res, next) => {
	NSEAPI.getQuotes().then(function (response) {
		res.json(response.data);
	});
});

// Get the quotation data of the symbol (companyName) from NSE - JSON
// Example: http://localhost:3000/nse/get_quote_info?companyName=TCS
app.get("/nse/get_quote_info", (req, res, next) => {
	NSEAPI.getQuoteInfo(req.query.companyName).then(function (response) {
		res.json(response.data);
	});
});

// Get the quotation data of the symbols (companyNames) from NSE - JSON
// Example: http://localhost:3000/nse/get_multiple_quote_info?companyNames=TCS,WIPRO
app.get("/nse/get_multiple_quote_info", (req, res, next) => {
	const companyNames = req.query.companyNames.split(",");
	NSEAPI.getMultipleQuoteInfo(companyNames).then((r) => res.json(r));
});

// Get the top 10 gainers of NSE - JSON
// Example: http://localhost:3000/nse/get_gainers
app.get("/nse/get_gainers", (req, res, next) => {
	NSEAPI.getGainers().then(function (response) {
		res.json(response.data);
	});
});

// Get the top 10 losers of NSE - JSON
// Example: http://localhost:3000/nse/get_losers
app.get("/nse/get_losers", (req, res, next) => {
	NSEAPI.getLosers().then(function (response) {
		res.json(response.data);
	});
});

// Get advances/declines of individual index, and the value if its changed or not - JSON
// Example: http://localhost:3000/nse/get_incline_decline
app.get("/nse/get_incline_decline", (req, res, next) => {
	NSEAPI.getInclineDecline().then(function (response) {
		res.json(response.data);
	});
});

// Get the information of all the companies in a single NSE index (slug) JSON
// Example: http://localhost:3000/nse/get_index_stocks?symbol=nifty
app.get("/nse/get_index_stocks", (req, res, next) => {
	NSEAPI.getIndexStocks(req.query.symbol).then(function (response) {
		res.json(response.data);
	});
});

// Get the list of companies in provided NSE index with matching keyword data - JSON
// Example: http://localhost:3000/nse/search_stocks?keyword=AXIS
app.get("/nse/search_stocks", (req, res, next) => {
	NSEAPI.searchStocks(req.query.keyword).then(function (response) {
		res.json(response.data);
	});
});

// Get the intra day data of company in NSE - XML
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=1
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=month
app.get("/nse/get_intra_day_data", (req, res, next) => {
	NSEAPI.getIntraDayData(req.query.companyName, req.query.time).then(
		function (response) {
			res.json(response.data);
		}
	);
});

// Get 52 weeks all high stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_high
app.get("/nse/get_52_week_high", (req, res, next) => {
	NSEAPI.get52WeekHigh().then(function (response) {
		res.json(response.data);
	});
});

// Get 52 weeks all low stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_low
app.get("/nse/get_52_week_low", (req, res, next) => {
	NSEAPI.get52WeekLow().then(function (response) {
		res.json(response.data);
	});
});

// Get the NSE stocks whose values are highest - JSON
// Example: http://localhost:3000/nse/get_top_value_stocks
app.get("/nse/get_top_value_stocks", (req, res, next) => {
	NSEAPI.getTopValueStocks().then(function (response) {
		res.json(response.data);
	});
});

// Get the NSE stocks whose volumes sold are highest - JSON
// Example: http://localhost:3000/nse/get_top_volume_stocks
app.get("/nse/get_top_volume_stocks", (req, res, next) => {
	NSEAPI.getTopVolumeStocks().then(function (response) {
		res.json(response.data);
	});
});

// Get the futures data for a company stock (symbol) and time - JSON
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=TCS&time=15
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=VEDL&time=month
app.get("/nse/get_stock_futures_data", (req, res, next) => {
	NSEAPI.getStockFuturesData(req.query.companyName, req.query.time).then(
		function (response) {
			res.json(response.data);
		}
	);
});

// Get chart data of a companyName(symbol) depending on time in NSE - CSV Format (delimiter - |)
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=5
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=year
app.get("/nse/get_chart_data_new", (req, res, next) => {
	NSEAPI.getChartDataNew(req.query.companyName, req.query.time).then(
		function (response) {
			res.json(response.data);
		}
	);
});

// Bombay Stock Exchange (NSE) APIS

// Get details of all index in BSE Stock exchange - JSON
// Example: http://localhost:3000/bse/get_indices
app.get("/bse/get_indices", (req, res, next) => {
	BSEAPI.getIndices().then(function (response) {
		res.json(response.data);
	});
});

// Get the information of only a single index eg. SENSEX (16) - JSON
// Example: http://localhost:3000/bse/getIndexInfo?indexId=16
app.get("/bse/getIndexInfo", (req, res, next) => {
	BSEAPI.getIndexInfo(req.query.indexId).then(function (response) {
		res.json(response.data);
	});
});

// Get todays closing data and daily data of past time using IndexId and time from BSE  - JSON
// Example: http://localhost:3000/bse/get_index_chart_data?indexId=16
app.get("/bse/get_index_chart_data", (req, res, next) => {
	BSEAPI.getIndexChartData(req.query.indexId, req.query.time).then(function (
		response
	) {
		res.json(response.data);
	});
});

// Get details of all the stocks in an index - JSON
// Example: http://localhost:3000/bse/get_index_stocks?indexId=16
app.get("/bse/get_index_stocks", (req, res, next) => {
	BSEAPI.getIndexStocks(req.query.indexId).then(function (response) {
		res.json(response.data);
	});
});

// Get details of company (stock) using securityCode - JSON
// 500112 - symbol (securityCode) of SBIN stock BSE
// Example: http://localhost:3000/bse/get_company_info?companyKey=500325
app.get("/bse/get_company_info", (req, res, next) => {
	BSEAPI.getCompanyInfo(req.query.companyKey).then(function (response) {
		res.json(response.data);
	});
});

// Get chart type details of stocks in BSE using companyKey and time - JSON
// returns(StockValue, Volume) for company in specified past time
// Example: http://localhost:3000/bse/get_stocks_chart_data?companyKey=500325&time=5
// Example: http://localhost:3000/bse/get_stocks_chart_data?companyKey=500325&time=month
app.get("/bse/get_stocks_chart_data", (req, res, next) => {
	BSEAPI.getStocksChartData(req.query.companyKey, req.query.time).then(
		function (response) {
			res.json(response.data);
		}
	);
});

// Get BSE stock data of stock info and day chart - HTML
// Example: http://localhost:3000/bse/get_stock_info_and_day_chart_data?companyKey=500325
app.get("/bse/get_stock_info_and_day_chart_data", (req, res, next) => {
	BSEAPI.getStockInfoAndDayChartData(req.query.companyKey).then(function (
		response
	) {
		res.json(response.data);
	});
});

// Get the top gainers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/get_gainers
app.get("/bse/get_gainers", (req, res, next) => {
	BSEAPI.getGainers().then(function (response) {
		res.json(response.data);
	});
});

// Get the top losers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/get_losers
app.get("/bse/get_losers", (req, res, next) => {
	BSEAPI.getLosers().then(function (response) {
		res.json(response.data);
	});
});

// Get the top turnovers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/getTopTurnOvers
app.get("/bse/getTopTurnOvers", (req, res, next) => {
	BSEAPI.getTopTurnOvers().then(function (response) {
		res.json(response.data);
	});
});

app.use(express.json());
const names = require("./bse/constant/names");
const stockList = require("./nse/allStocksList/list");
const UserModel = require("./src/mongoDb/userModel");
const jwt = require("jsonwebtoken");

// API's for the mongo

app.get("/getstocklist", async (req, res) => {
	try {
		res.send(stockList);
	} catch (error) {
		res.status(400).send("Error");
	}
});

app.post("/registeruser", async (req, res) => {
	try {
		let userData = req.body;
		let registerUser = new userModel(userData);
		// res.send(registerUser);
		registerUser.save((err, result) => {
			if (err) {
				res.send(err);
			} else {
				let payload = { subject: registerUser._id };
				let token = jwt.sign(payload, "secretkey");
				res.send({ token });
			}
		});
	} catch (error) {
		res.status(401).send(error);
	}
});

app.post("/login", async (req, res) => {
	try {
		let userData = req.body;
		console.log(userData);
		const user = await userModel.findOne({
			"userlogin.email": userData.email,
		});
		// console.log(user);
		if (!user) {
			res.status(400).send("User not found");
		} else {
			if (user.userlogin.password != userData.password) {
				res.status(400).send("Password err");
			} else {
				// create an token and send it to the browser ie as response
				let payload = { subject: user._id };
				let token = jwt.sign(payload, "secretkey");
				res.send({ token });
			}
		}
	} catch (error) {
		res.send(401).send(error);
	}
});

app.patch("/addPortfolio", async (req, res) => {
	try {
		let stock = req.body.stocks;
		let token = req.body.token;
		console.log(stock);
		let payload = jwt.verify(token, "secretkey");
		if (!payload) {
			return res.status(401).send("unauthorized Request");
		}
		userId = payload.subject;

		let updateUser = await userModel.updateOne(
			{ _id: userId },
			{
				$addToSet: {
					watchlist: [stock],
				},
			}
		);
		res.status(201).send(updateUser);
	} catch (error) {
		res.status(401).send(error);
	}
});

app.post("/loadWatchlist", async (req, res) => {
	try {
		let token = req.body.token;
		console.log(token);
		let payload = jwt.verify(token, "secretkey");
		if (!payload) {
			return res.status(401).send("unauthorized Request");
		}
		userId = payload.subject;

		let updateUser = await userModel.findOne({ _id: userId });
		res.send(updateUser.watchlist);
	} catch (error) {
		res.status(401).send(error);
	}
});

app.post("/removeStockWatchlist", async (req, res) => {
	try {
		watchlistGiven = req.body.name;
		let token = req.body.token;
		console.log(token);
		let payload = jwt.verify(token, "secretkey");
		if (!payload) {
			return res.status(401).send("unauthorized Request");
		}
		userId = payload.subject;
		let updateUser = await userModel.findOne({ _id: userId });
		console.log(updateUser);
		watchlistFilter = updateUser.watchlist;
		console.log(watchlistFilter);
		console.log(watchlistGiven);

		selectedWatchlist = [];
		watchlistFilter.forEach((element) => {
			if (element[0] != watchlistGiven) {
				selectedWatchlist.push(element);
			}
		});

		console.log(selectedWatchlist);

		const userFinal = await userModel.findByIdAndUpdate(
			{ _id: userId },
			{
				$set: { watchlist: selectedWatchlist },
			}
		);
		res.send(userFinal);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = app;
