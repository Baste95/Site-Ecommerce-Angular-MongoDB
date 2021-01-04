const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./account/userRoute");
const adminRoutes = require("./admin/adminRoute");
const categorieRoutes = require("./categorie/categorieRoute");
const productRoutes = require("./product/productRoute");
const orderRoutes = require("./order/orderRoute");

app.use(cors()); // configure cors
//configure body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan
// define first route
app.get("/", (req, res) => {
    console.log("Hello MEAN Soldier...Ready For Battle??");
});
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/categorie", categorieRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);



app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

require("./config/db")(app);



