const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));


//Routes
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');
const VerifyUserLoginRoute = require('./routes/VerifyUserLogin');
const foodcategoryRoutes = require('./routes/foodcategorys');
const recomendedRoutes =require('./routes/recomendeds');
const recentRoutes =require('./routes/recents');
const AllCount =require('./routes/all_count');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/verifyuser`, VerifyUserLoginRoute);
app.use(`${api}/foodcategories`, foodcategoryRoutes);
app.use(`${api}/recomended`, recomendedRoutes);
app.use(`${api}/recent`, recentRoutes);
app.use(`${api}/count`, AllCount);

//Database

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})