class ValidatorHandler {
    static handle(schema, property) {
        return (req, res, next) => {
            const data = req[property];
            const { error } = schema.validate(data, { abortEarly: false });
            
            if (error) {
                const errorMessage = error.details.map(detail => detail.message).join(', ');
                const validationError = new Error(`Validation error: ${errorMessage}`);
                validationError.status = 400; // Bad Request
                return next(validationError);
            }
            
            next();
        };
    }
}

module.exports = ValidatorHandler;