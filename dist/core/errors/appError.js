"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlErrorHandler = exports.errorTypes = void 0;
const graphql_1 = require("graphql");
const errors_1 = require("@apollo/server/errors");
exports.errorTypes = {
    BAD_REQUEST: {
        errorCode: errors_1.ApolloServerErrorCode.BAD_REQUEST,
        errorStatus: 400
    },
    INTERNAL_SERVER_ERROR: {
        errorCode: errors_1.ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        errorStatus: 500
    },
    NOT_FOUND: {
        errorCode: 'NOT_FOUND',
        errorStatus: 404
    },
    ALREADY_EXISTS: {
        errorCode: 'ALREADY_EXISTS',
        errorStatus: 400
    },
    UNAUTHENTICATED: {
        errorCode: 'UNAUTHENTICATED',
        errorStatus: 401
    }
};
const graphqlErrorHandler = (errorMessage, _errorType) => {
    return new graphql_1.GraphQLError(errorMessage.message);
};
exports.graphqlErrorHandler = graphqlErrorHandler;
