class ErrorResponse extends Error {
    constructor(message, statusCode){  // whenever we create a response constructor will get a message and statusCode
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;