require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit'); //ensure DDOS
const connectDB = require('./src/db/db');
connectDB();
const limit = rateLimit({
	windowMs: 15 * 60 * 1000, // 15min >> within milliseconds
	max: 100, //from the same IP allow person to call API 100 times for every 15 mins interval
	standardHeaders: true,
	legacyHeaders: false,
});

const app = express();
app.use(cors()); //anyone anywhere able to access api
app.use(helmet()); //harder to get info out of api
app.use(limit); // prevent DDOS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
