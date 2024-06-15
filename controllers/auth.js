const User = require('../models/User');

exports.register = async ( req , res , next ) => {
    const {firstname, lastname, email, phone, password} = req.body;   //lets extract the data from the body

    try {
        const user = await User.create({
            firstname, lastname, email, phone, password
        });
        // res.status(200).json({
        //     success: true,
        //     token: "hello1",
        // });

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.login = async ( req , res , next ) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({success: false, error: "Please provide a valid email and password"}); // if not provided email and password
    }
    
    try {
        const user = await User.findOne({email}).select("+password"); // // as email is unique then it will search for it and then match with password.
        if (!user) {
            res.status(404).json({success: false, error: "Invalid email"});
        }

        const isMatch = await user.matchPasswords(password);  //for matching the password it is sended to /models/User 
        if(!isMatch) {
            res.status(404).json({success: false, error: "Invalid password"});
        }
        // res.status(200).json({success:true, token:"hello"});
        sendToken(user, 201, res);
    }catch (err) {
        res.status(500).json({success: false, error: err.message});
    }
};

exports.forgotpassword = ( req , res , next ) => {
    res.send("forgotpassword Route")
};

exports.resetpassword = ( req , res , next ) => {
    res.send("resetpassword Route")
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success:true, token})
};