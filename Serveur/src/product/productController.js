const Product = require("./productModel");



exports.addNewProduct = async (req, res) => {
    try {
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            shortdescription: req.body.shortdescription,
            features: req.body.features,
            price: req.body.price,
            stock: req.body.stock,
            brand: req.body.brand,
            reduction: req.body.reduction,
            categorie: req.body.categorie,
            subcategorie: req.body.subcategorie,
            mainimage: req.body.mainimage,
            secondaryimage: req.body.secondaryimage,
            note: req.body.note,
            notelength: 0
        })
        let createdProduct = await product.save();
        res.status(200).json({
            msg: "New product created",
            data: createdProduct
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.getProductsByCategorie = async (req, res) => {
    try {
        let name = req.params.id.replace(/_/g, ' ');
        let max = 10;
        let products = await Product.find({categorie: name})
                                    .skip(req.params.page * max)
                                    .limit(max)
                                    .sort({_id: -1});
                                    
        //check if categories exit
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            productsCredentials: products
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

exports.getProductsBySubCategorie = async (req, res) => {
    try {
        let name = req.params.id.replace(/_/g, ' ');
        let max = 10;
        let products = await Product.find({subcategorie: name})
                                    .skip(req.params.page * max)
                                    .limit(max)
                                    .sort({_id: -1});
        //check if product exit
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            productsCredentials: products
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

exports.getProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        //check if product exit
        if (!product) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found product"
            })
        }
        res.status(200).json({
            success: true,
            productCredentials: product
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

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findOneAndDelete({name: req.body.name});
        //check if categories exit
        if (!product) {
            res.status(400).json({
                type: "Not Found",
                msg: "La produit n'as pas été trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "La produit à été supprimé."
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

exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate({name: req.body.name}, 
                                        {
                                            name: req.body.newname,
                                            description: req.body.description,
                                            shortdescription: req.body.shortdescription,
                                            features: req.body.features,
                                            price: req.body.price,
                                            stock: req.body.stock,
                                            brand: req.body.brand,
                                            reduction: req.body.reduction,
                                            categorie: req.body.categorie,
                                            subcategorie: req.body.subcategorie,
                                            mainimage: req.body.mainimage,
                                            secondaryimage: req.body.secondaryimage,
                                            note: req.body.note
                                        });
        //check if categories exit
        if (!product) {
            res.status(400).json({
                type: "Not Found",
                msg: "Le produit n'as pas été trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "Le produit à été changé."
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

exports.getProductsBySearch = async (req, res) => {
    try {
        let name = req.params.id.replace(/_/g, ' ');
        let products;
        if(name.length < 4){
            let rg = "\\b" + name + "\\b.*";
            products = await Product.find({name: { $regex: rg,  $options: 'i'}})
                                    .sort({_id: -1});
        }
        else{
            let rg = name + ".*";
            products = await Product.find({name: { $regex: rg,  $options: 'i'}})
                                    .sort({_id: -1});
        }
       
        //check if categories exit
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            productCredentials: products
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

exports.getProductsBySearchAndCategory = async (req, res) => {
    try {
        let name = req.params.id.replace(/_/g, ' ');
        let cate = req.params.category.replace(/_/g, ' ');
        let products;
        if(name.length < 4){
            let rg = "\\b" + name + "\\b.*";
            products = await Product.find({name: { $regex: rg,  $options: 'i'}, categorie: cate})
                                    .sort({_id: -1});
        }
        else{
            let rg = name + ".*";
            products = await Product.find({name: { $regex: rg,  $options: 'i'}, categorie: cate})
                                    .sort({_id: -1});
        }
       
        //check if categories exit
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            productCredentials: products
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

exports.getProductsByReduction = async (req, res) => {
    try {
        let max = 10;
        let products = await Product.find({reduction: {"$ne": null}})
                                    .skip(req.params.page * max)
                                    .limit(max)
                                    .sort({_id: -1});
        //check if product exit
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            productsCredentials: products
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

exports.getNewsProducts = async (req, res) => {
    try {
        let max = 20;
        let products = await Product.find()
                                    .limit(max)
                                    .sort({_id: -1});
        //check if product exit
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            productsCredentials: products
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

exports.getNewsProductsHome = async (req, res) => {
    try {
        let max = 5;
        let products = await Product.find()
                                    .limit(max)
                                    .sort({_id: -1});
        //check if product exit
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            productsCredentials: products
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

exports.getProductsByReductionHome = async (req, res) => {
    try {
        let max = 5;
        let products = await Product.find({reduction: {"$ne": null}})
                                    .limit(max)
                                    .sort({_id: -1});
        //check if product exit
        if (!products) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found products"
            })
        }
        res.status(200).json({
            success: true,
            productsCredentials: products
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

exports.addNoteToProduct = async (req, res) => {
    try {
        let product = await Product.findByIdAndUpdate(req.body.id, 
                                        {
                                            $push: {note : req.body.note},
                                            $inc : {notelength : 1}
                                        });
        //check if categories exit
        if (!product) {
            res.status(400).json({
                type: "Not Found",
                msg: "Le produit n'as pas été trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "Le produit à été changé."
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


