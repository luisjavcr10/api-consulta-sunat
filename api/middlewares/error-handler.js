class ErrorHandler {
    static logErrors(err, req, res, next) {
        console.error(err); // Log del error en la consola
        next(err); // Pasar el error al siguiente middleware
    }

    static errorHandler(err, req, res, next) {
        const statusCode = err.status || 500; // Obtener el código de estado o usar 500 por defecto
        const response = {
            message: err.message || "Internal Server Error", // Mensaje de error
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Mostrar stack solo en desarrollo
        };

        res.status(statusCode).json(response); // Enviar la respuesta al cliente
    }
}

module.exports = ErrorHandler;