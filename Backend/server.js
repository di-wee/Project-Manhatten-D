require("dotenv").config();

const express = require("express");

const connectDB = require("./src/db/db");
const payment = require("./src/routers/payment");
const cart = require("./src/routers/cart");
const productRoutes = require("./src/routers/products");
const address = require("./src/routers/address");
const userDetails = require("./src/routers/userDetails");
const stripe = require("stripe")(process.env.TEST_KEY); //test key needed to access stripe
const session = require("express-session"); //start of every session is when db is started. when db resets, session restarts
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET_KEY, //secret key used for signing the session ID cookie. session ID provided when user access website for the first time
    resave: false, //whether the session should be saved back to the session store (refers to the place where session data is stored)
    saveUninitialized: true, //uninitialized sessions will be saved to the store
    cookie: { secure: false }, // 'true' if using HTTPS
  })
);

app.use("/api", payment);
app.use("/api", cart);
app.use("/api", productRoutes);
app.use("/api", address, userDetails);

const PORT = process.env.PORT || 1945;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
