const boom = require('@hapi/boom');

class ValidatorHandler {
    static handle(schema, property) {
        return (req, res, next) => {
            const data = req[property];
            const {error} = schema.validate(data,{ abortEarly: false });
            if (error) {
                return next(boom.badRequest(error));
            }
            next();
        };
    }
}

module.exports = ValidatorHandler;