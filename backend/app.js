const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs')
require('dotenv').config()

const initDbConnection = require('./database/db-connect')

const db = new initDbConnection()
module.exports = db

const routes = require('./routes/routes')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))

hbs.registerPartial('footer', '/views/partials/footer')
hbs.registerPartial('nav', '/views/partials/nav')
hbs.registerPartial('modal', '/views/partials/modal')
hbs.registerPartial('notification', '/views/partials/notification')
//app.engine('html', hbs.__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('500')
})

module.exports = app

