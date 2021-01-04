const connectionString = "mongodb+srv://Bastien_Pelmard:D5D7rCXE1s03DzSj@cluster0.vorf6.mongodb.net/<dbname>?retryWrites=true&w=majority"
const mongoose = require("mongoose");
module.exports = function (app) {
    mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(connrction => console.log("Application is connected to db")).catch(err => console.log(err))
    mongoose.Promise = global.Promise;
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);
    if (app) {
        app.set("mongoose", mongoose);
    }
};
function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}