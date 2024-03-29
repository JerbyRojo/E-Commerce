require('dotenv').config();
// [SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order")

// [SECTION] Environment Setup
const port = 4001;

// [SECTION] Server Setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// [SECTION] Database Connection
mongoose.connect("mongodb+srv://jerbyrojo:admin@cluster0.89ly44w.mongodb.net/E-Commerce-API-MVP?retryWrites=true&w=majority")

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

// [SECTION] Backend Routes
// Groups all routes in userRoutes under "/users"
app.use("/b1/users", userRoutes);
app.use('/b1/products', productRoutes);
app.use('/b1/cart', cartRoutes);
app.use('/b1/order', orderRoutes);

// [SECTION] Server Gateway Response
if(require.main === module){
	// "process.env.PORT || port" will use the environment variable if it is avaiable OR will used port 4000 if none is defined
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${process.env.PORT || port}`)
	});
}

module.exports = { app, mongoose };