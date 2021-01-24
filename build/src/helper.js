"use strict";
/*********
 * Helper
 *   Here you can define all those functions that can be
 *   useful in several places but does not belong to any
 *   of the other files.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromRequest = exports.getParameterFromRequest = exports.getIdParameter = exports.getNumberFromRequest = exports.getNumberParameterFromRequest = void 0;
/**
 * Extract a specific parameter from the query-string
 * @param req The request (as given in the controller)
 * @param param The id of the parameter to be extracted
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
const getNumberParameterFromRequest = (req, param) => {
    let value = req.params.n;
    if (typeof value !== 'string') {
        return false;
    }
    try {
        return parseInt(value);
    }
    catch (e) {
        console.error(`Error extracting number parameter:`, e);
        return false;
    }
};
exports.getNumberParameterFromRequest = getNumberParameterFromRequest;
/**
 * Parse a number parameter from a query
 * @param req The request (as given in the controller)
 * @param param The name of the number parameter to get
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
const getNumberFromRequest = (req, param) => {
    let value = req.query[param];
    if (typeof value !== 'string') {
        return false;
    }
    try {
        return parseInt(value);
    }
    catch (e) {
        console.error(`Error extracting parameter ${param}:`, e);
        return false;
    }
};
exports.getNumberFromRequest = getNumberFromRequest;
/**
 * Get the "id" parameter from a query
 * @param req The request (as given in the controller)
 * @return the id if it is correct and available, false otherwise
 */
const getIdParameter = (req) => {
    let value = req.params.id;
    if (typeof value !== 'string') {
        return false;
    }
    try {
        return parseInt(value);
    }
    catch (e) {
        console.error(`Error extracting id parameter:`, e);
        return false;
    }
};
exports.getIdParameter = getIdParameter;
/**
 * Get a parameter from the query
 * @param req The request (as given in the controller)
 * @param param The parameter to get from the request
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
const getParameterFromRequest = (req, param) => {
    let value = req.query[param];
    try {
        return value === undefined ? "" : value;
    }
    catch (e) {
        console.error(`Error extracting parameter ${param}:`, e);
        return false;
    }
};
exports.getParameterFromRequest = getParameterFromRequest;
/**
 * Extract id from the request query-string
 * @param req The request (as given in the controller)
 * @return the id if the parameter is correct and
 * available, false otherwise
 */
const getIdFromRequest = (req) => {
    return exports.getNumberFromRequest(req, 'id');
};
exports.getIdFromRequest = getIdFromRequest;
