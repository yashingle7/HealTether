const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide firstname"],
        match: [
            /^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/,
            "Please provide valid firstname"
        ]
    },
    lastname: {
        type: String,
        required: [true, "Please provide lastname"],
        match: [
            /^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/,
            "Please provide valid firstname"
        ]
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address"
        ]
    },
    phone: {
        type: String,
        required: [false, "Please provide phone number"],
        unique: true,
        match: [
            /^[6-9]\d{9}$/, "Please provide a valid phone number"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 8,
        select: false 
        //It is used to include or exclude document fields that are returned from a Mongoose query.
        //I don't want the password to be accessible by default, but I need a method to check against a user inputted password before authenticating the user.
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// before saving to db we need to encrypt the password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {     //password field modify then only
        next();
    }
    const salt = await bcrypt.genSalt(10); //generate salt higher the number of rounds more secure
    this.password = await bcrypt.hash(this.password, salt)  //after encrytion it will update in password field and ready to be saved
    next();     //save
});

UserSchema.methods.matchPasswords = async function (password ) {  // password here is the password which got from login field
    return await bcrypt.compare(password, this.password);   // now this will match the password got from controllers/auth.js
}

UserSchema.methods.getSignedToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

// we later use this model in our controllers/auth