const express = require('express');
const exphbs  = require('express-handlebars');
const body = require("body-parser");
const app = express();
const PORT =  process.env.PORT || 5000;
const session = require('express-session');
// enable the req.body object - to allow us to use HTML forms
app.use(body.json());
app.use(body.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));
// config routes

app.use(session({secret: 'keyboard cat', cookie: {maxAge:600000}}));
// add more middleware to allow for templating support
const routes = require("./routes/routeslogic");
const useRoutes = routes();
app.engine('handlebars', exphbs({defaultLayout: "main", layoutsDir: "views/layouts"}));
app.set('view engine', 'handlebars');
app.post('/login', useRoutes.logIn);
app.get('/', useRoutes.homeRoute);
app.get('/buy/:type' , useRoutes.buyRoute);
app.get("/pizza/:size/:action", useRoutes.unique);
app.post("/order", useRoutes.orderRoute);
app.post("/ordernow", useRoutes.orderNow);
app.get("/change/:action/:id", useRoutes.changeOrderStatus)

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});