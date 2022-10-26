const GenericResponseEntity = require('../entities/GenericResponseEntity');

const httpResponse = (entity, res, req) => {
    if (entity instanceof GenericResponseEntity) {
        const response = entity.toResponse();

        res.status(response.statusCode).send({
            success: response.success,
            message: response.message,
            messageTitle: response.messageTitle,
            data: response.data,
            responseTime: response.responseTime,
        });
        return;
    }

    res.status(500);
};

const createGenericPostRequestSuccessResponse = (data) => {
    const response = new GenericResponseEntity();
    response.success = true;
    response.statusCode = 201;
    response.data = data;
    response.message = 'Data saved successfully';
    return response;
};

const createGenericPutRequestSuccessResponse = (data) => {
    const response = new GenericResponseEntity();
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    response.message = 'Data Updated successfully';
    return response;
};

const createGenericRequestSuccessResponse = (
    data,
    message = 'Data found successfully',
    success = true
) => {
    const response = new GenericResponseEntity();
    response.success = success;
    response.statusCode = 200;
    response.data = data;
    response.message = message;
    return response;
};

const createGenericErrorResponse = (message = 'Error', statusCode = 400) => {
    const response = new GenericResponseEntity();
    response.success = false;
    response.statusCode = statusCode;
    response.message = message;
    return response;
};

const createGenericNotFoundResponse = (message = 'Data Not found!') =>
    createGenericErrorResponse(message, 404);

const sendMalformedBodyResponse = (exception) => {
    const response = new GenericResponseEntity();
    response.statusCode = 400;
    response.message = 'Malformed Request';
    response.success = false;
    response.data =
        exception && exception.details
            ? exception?.details[0]?.message
            : exception && exception.stack && exception.message
            ? exception.message
            : {};
    return response;
};

module.exports = {
    httpResponse,
    createGenericPostRequestSuccessResponse,
    createGenericPutRequestSuccessResponse,
    createGenericRequestSuccessResponse,
    createGenericErrorResponse,
    createGenericNotFoundResponse,
    sendMalformedBodyResponse,
};
