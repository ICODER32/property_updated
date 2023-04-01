const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://m001-student:Ibtisam@sandbox.xuwkkn8.mongodb.net/Property?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = mongoose.connection;
