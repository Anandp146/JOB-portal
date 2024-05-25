// Define a custom error handler class that extends the built-in Error class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // Call the constructor of the parent class (Error) with the provided message
        this.statusCode = statusCode; // Set the status code property
    }
}
// Function to handle casting errors
const handleCastError = (err) => {
    const message = `Resource not found. Invalid ${err.path}`; // Construct error message
    return new ErrorHandler(message, 400); // Return a new instance of ErrorHandler with the error message and status code
};
// Function to handle duplicate key errors
const handleDuplicateKeyError = (err) => {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`; // Construct error message
    return new ErrorHandler(message, 400); // Return a new instance of ErrorHandler with the error message and status code
};
// Function to handle JSON Web Token errors
const handleJsonWebTokenError = () => {
    return new ErrorHandler("Json Web Token is invalid, Try again!", 400); // Return a new instance of ErrorHandler with a predefined error message and status code
};

// Function to handle expired JSON Web Tokens
const handleTokenExpiredError = () => {
    return new ErrorHandler("Json Web Token is expired, Try again!", 400); // Return a new instance of ErrorHandler with a predefined error message and status code
};

// Middleware function to handle errors globally
export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error"; // Set default error message if not provided
    err.statusCode = err.statusCode || 500; // Set default status code if not provided

    let error = err; // Initialize 'error' variable with the provided error

    // Check the type of error and call corresponding handler function
    if (err.name === "CastError") {
        error = handleCastError(err);
    } else if (err.code === 11000) {
        error = handleDuplicateKeyError(err);
    } else if (err.name === "JsonWebTokenError") {
        error = handleJsonWebTokenError();
    } else if (err.name === "TokenExpiredError") {
        error = handleTokenExpiredError();
    }

    // Send JSON response with error status code and message
    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};
// Export the ErrorHandler class
export default ErrorHandler;
