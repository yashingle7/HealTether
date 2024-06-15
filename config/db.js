const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {                               //in env folder there is MONGODB_URI
        // userNewUrlParser : true,
        // useCreateIndex : true,
        // useUnifiedTopology : true,
        // useFindAndModify : true
    });
    console.log('MongoDB connected')
}

module.exports = connectDB;