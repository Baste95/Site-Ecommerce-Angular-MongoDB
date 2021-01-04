const Order = require("./orderModel");
const Product = require("../product/productModel");

exports.addNewOrder = async (req, res) => {
    try {
        let idArray = req.body.product.id_product;
        console.log(idArray);
        let order = new Order({
            user: req.userData.user._id,
            product: req.body.product,
            finalprice: req.body.finalprice,
            cart: req.body.cart,
            fulladress:{
                adress: req.userData.user.fulladress.adress,
                adress2: req.userData.user.fulladress.adress2,
                zip: req.userData.user.fulladress.zip,
                city: req.userData.user.fulladress.city,
                country: req.userData.user.fulladress.country,
                county: req.userData.user.fulladress.county,
            },
            description : "Article en préparation"
        })
        let createdOrder = await order.save();
        for(let i = 0; i < idArray.length; i++){
           await Product.findByIdAndUpdate((idArray[i]),{$inc : {stock : -1}});
        }
        res.status(200).json({
            msg: "New order created",
            data: createdOrder
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        let order = await Order.findByIdAndUpdate(req.body.id, 
                                        {
                                            description: req.body.description,
                                        });
        //check if categories exit
        if (!order) {
            res.status(400).json({
                type: "Not Found",
                msg: "La commande n'a pas été trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "Commande changé."
        })
    } 
    catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        let order = await Order.findByIdAndDelete(req.body.id);
        //check if categories exit
        if (!order) {
            res.status(400).json({
                type: "Not Found",
                msg: "La commande n'a pas été trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "Commande supprimé."
        })
    } 
    catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.getOrder = async (req, res) => {
    try {
        let order = await Order.find({user: req.userData.user._id});
        //check if categories exit
        if (!order || order === []) {
            res.status(400).json({
                type: "Not Found",
                msg: "La commande n'a pas été trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "Commande trouvés.",
            orderCredentials : order
        })
    } 
    catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.getRecommendation = async (req, res) => {
    try {
        let order = await Order.find({user: req.userData.user._id})
                                    .limit(1)
                                    .sort({_id: -1});
        //check if categories exit
        if (!order || order === []) {
            res.status(400).json({
                type: "Not Found",
                msg: "Aucune commande."
            })
        }
        let category = await Product.findById(order[0].product.id_product[0]);
        let products = await Product.find({categorie: category.categorie})
                                .limit(5)
                                .sort({notelength: -1});
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            msg: "Commande trouvés.",
            productsCredentials : products
        })
    } 
    catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}
