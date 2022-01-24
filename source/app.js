const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const app = express();
// set the View Engine or the Templating Engine to EJS
app.set('view engine', 'ejs');

// set the root to the views in the `./views` directory
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

// set path tp static asssest such as CSS and JS in the `./public` directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 1. if the URL has `/admin`, then it can access the administrator routes and views
 * 2. if URL is simple, without `/admin`, it can only access shop routes
 */
app.use('/admin', adminRoutes.routes); /* 1 */
app.use(shopRoutes); /* 2 */

app.use(errorController.get404);

app.listen(3000);
