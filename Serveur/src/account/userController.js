const User = require("./userModel");

exports.registerNewUser = async (req, res) => {
    try {
        let user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            fulladress:{
                adress: req.body.fulladress.adress,
                adress2: req.body.fulladress.adress2,
                zip: req.body.fulladress.zip,
                city: req.body.fulladress.city,
                country: req.body.fulladress.country,
                county: req.body.fulladress.county,
            },
            newsletter: req.body.newsletter
        })
        user.password = await user.hashPassword(req.body.password);
        let createdUser = await user.save();
        res.status(200).json({
            msg: "New user created",
            data: createdUser
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.loginUser = async (req, res) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        let user = await User.findOne({
            email: login.email
        });
        //check if user exit
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "Identifiant ou mot de passe incorrect."
            })
        }
        let match = await user.compareUserPassword(login.password, user.password);
        if (match) {
            let token = await user.generateJwtToken({
                user
            }, "secret", {
                expiresIn: 604800
            })
            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Identifiant ou mot de passe incorrect."
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

exports.defineDummyData = async (req, res) => {
    res.json({
        message: req.userData.user._id
    })
}

exports.updateAdress = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.userData.user._id, 
                                        {
                                            fulladress:{
                                                adress: req.body.fulladress.adress,
                                                adress2: req.body.fulladress.adress2,
                                                zip: req.body.fulladress.zip,
                                                city: req.body.fulladress.city,
                                                country: req.body.fulladress.country,
                                                county: req.body.fulladress.county,
                                            },
                                        });
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "User pas trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "L'adresse à été modifié."
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

exports.updateMail = async (req, res) => {
    try {
        let user = await User.findOneAndUpdate({email: req.body.email}, 
                                        {
                                            email: req.body.newemail
                                        });
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "User pas trouvé."
            })
        }
        res.status(200).json({
            success: true,
            msg: "L'adresse mail à été modifié."
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