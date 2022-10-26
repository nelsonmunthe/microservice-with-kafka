
class GenericResponseEntity {
    /**
     * @var {boolean}
     */
    success = false;
    /**
     *
     * @type {string}
     */
    message = null;
    /**
     *
     * @type {string}
     */
    messageTitle = null;
    /**
     * @var {object}
     */
    data = null;
    /**
     * @var {object}
     */
     summary = null;

    statusCode = 400;

    startTime = 0;

    constructor() {
        this.startTime = new Date().getTime();
    }

    toResponse() {
        this.statusCode = this.success ? 200 : (this.statusCode ?? 400);

        return {
            statusCode: this.statusCode,
            success: this.success,
            message: this.message,
            messageTitle: this.messageTitle,
            summary: this.summary,
            data: this.data,
            responseTime: this.startTime
                ? new Date().getTime() - this.startTime + " ms."
                : "unknown",
        };
    }

    errorResponse(message, code, data) {
        const res = new GenericResponseEntity();
        res.success = false;
        res.message = message;
        res.statusCode = code || 400;
        res.data = data;

        return res;
    }

    successResponse(message, code, data) {
        const res = new GenericResponseEntity();
        res.success = true;
        res.message = message;
        res.statusCode = code || 200;
        res.data = data;

        return res;
    }
}

module.exports = GenericResponseEntity;
