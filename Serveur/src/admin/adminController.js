const Admin = require("./adminModel");

exports.registerNewAdmin = async (req, res) => {
    try {
        let admin = new Admin({
            user: req.body.user,
        })
        admin.password = await admin.hashPassword(req.body.password);
        let createdAdmin = await admin.save();
        res.status(200).json({
            msg: "New admin created",
            data: createdAdmin
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.loginAdmin = async (req, res) => {
    const login = {
        user: req.body.user,
        password: req.body.password
    }
    try {
        let admin = await Admin.findOne({
            user: login.user
        });
        //check if admin exit
        if (!admin) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
        let match = await admin.compareUserPassword(login.password, admin.password);
        if (match) {
            let token = await admin.generateJwtToken({
                admin
            }, "I4ImzvWEaWcukH5jonz4fbN1Xmh0fU7uK3H9MH3M9dPbtce1N6WbgYoRZCaEHdJ", {
                expiresIn: 604800
            })
            if (token) {
                res.status(200).json({
                    success: true,
                    tokenadmin: token,
                    adminCredentials: admin
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
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

/*exports.defineDummyData = async (req, res) => {
    res.json({
        message: "Hello World"
    })
}*/