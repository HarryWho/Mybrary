if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();


// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'))

// routes
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (err) => {
    console.error(err.message); 
})
db.once('open', () => {
    console.log("MongoDB Connected"); 
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})