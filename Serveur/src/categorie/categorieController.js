const Categorie = require("./categorieModel");



exports.addNewCategorie = async (req, res) => {
    try {
        let categorie = new Categorie({
            name: req.body.name,
            description: req.body.description,
            subcategories: req.body.subcategories,
        })
        let createdCategorie = await categorie.save();
        res.status(200).json({
            msg: "New categorie created",
            data: createdCategorie
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.getCategories = async (req, res) => {
    try {
        let categories = await Categorie.find()
        //check if categories exit
        if (!categories) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found categories"
            })
        }
        res.status(200).json({
            success: true,
            categoriesCredentials: categories
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

exports.getCategorie = async (req, res) => {
    try {
        let name = req.params.id.replace(/-/g, ' ');
        let categorie = await Categorie.findOne({name: name});
        //check if categories exit
        if (!categorie) {
            res.status(400).json({
                type: "Not Found",
                msg: "Dont found category"
            })
        }
        res.status(200).json({
            success: true,
            categoriesCredentials: categorie
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

exports.updateCategorie = async (req, res) => {
    try {
        let categorie = await Categorie.findOneAndUpdate({name: req.body.name}, 
                                        {name: req.body.newname, description: req.body.description, subcategories: req.body.subcategories,});
        //check if categories exit
        if (!categorie) {
            res.status(400).json({
                type: "Not Found",
                msg: "La catégorie n'as pas été trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "La catégorie à été changé."
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

exports.deleteCategorie = async (req, res) => {
    try {
        let categorie = await Categorie.findOneAndDelete({name: req.body.name});
        //check if categories exit
        if (!categorie) {
            res.status(400).json({
                type: "Not Found",
                msg: "La catégorie n'as pas été trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "La catégorie à été supprimé."
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
