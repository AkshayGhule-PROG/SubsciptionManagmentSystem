const errorMiddleware = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    
    console.log('Error Log:', err); // Log the error for debugging

    // Mongoose Bad Object ID
    if (err.name === 'CastError') {
        const message = "Resource not found";
        error = new Error(message);
        error.statusCode = 404;
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new Error(message);
        error.statusCode = 400;
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message).join(', ');
        error = new Error(message);
        error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
    });
};

export default errorMiddleware;
