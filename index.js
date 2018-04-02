var app = require('./src/app')
const mongoose = require("mongoose");
var conn = process.env.MONGGO_DB_URI || 'mongodb://localhost/test'
mongoose.connect(conn);


app.listen(3000, function () {
    console.log("my web is running");
});

