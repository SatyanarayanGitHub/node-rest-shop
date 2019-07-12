const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


async function signupUser(req, res, next) {
    console.log(req.body.email);
    //Check email does not exist in db
    const user = await User.find({ email: req.body.email });
    //console.log('User exist: ', user);
    if (user.length > 0) {
        return res.status(409).json({
            success: false,
            message: "Email Id already exist"
        })
    }

    // Encrypt the password before save into db
    bcrypt.hash(req.body.password, saltRounds, (err, hashPassword) => {
        if (err) {
            console.log("==>> ERROR :: ", err);
            return res.status(500).json({
                success: false,
                error: err
            })
        } else {

            const newUser = new User({
                _id: new mongoose.Types.ObjectId,
                email: req.body.email,
                password: hashPassword
            });

            newUser.save()
                .then(result => {
                    //console.log(result);
                    res.status(200).json({
                        success: true,
                        message: 'User created'
                    });
                })
                .catch(err => {
                    console.log("==>> ERROR :: ", err);
                    res.status(500).json({
                        success: false,
                        errorMessage: err
                    });
                });
        }
    })
}

function deleteUser(req, res, next) {

    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            console.log(result);
            if (result.deletedCount > 0) {
                res.status(200).json({
                    success: true,
                    message: "user deleted!!"
                })
            } else {

                res.status(404).json({
                    success: false,
                    message: 'User not found'
                })

            }
        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                success: false,
                errorMessage: err
            });
        });
}

async function loginUser(req, res, next) {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authentication Failed!! - Email address or password is incorrect"
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Authentication Failed!! - Email address or password is incorrect'
                        })
                    }

                    if (result) {
                        return res.status(200).json({
                            success: true,
                            message: 'Authentication successfully done!!'
                        });
                    }

                    res.status(401).json({
                        message: 'Authentication Failed!! - Email address or password is incorrect'
                    })
                });
            }
        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                success: false,
                errorMessage: err
            });
        });
}

module.exports = {
    signupUser,
    deleteUser,
    loginUser
}