/*********
 * Helper
 *   Here you can define all those functions that can be
 *   useful in several places but does not belong to any
 *   of the other files.
 */

import { Request } from 'express';

/**
 * Extract a specific parameter from the query-string
 * @param req The request (as given in the controller)
 * @param param The id of the parameter to be extracted
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
export const getNumberParameterFromRequest: (req: Request, param: string) => number = (
  req,
  param
) => {
  let value = req.params.n;

  if (typeof value !== 'string') {
    return NaN;
  }

  try {
    return parseInt(value);
  } catch (e) {
    console.error(`Error extracting number parameter:`, e);
    return NaN;
  }
};

/**
 * Parse a number parameter from a query
 * @param req The request (as given in the controller)
 * @param param The name of the number parameter to get
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
export const getNumberFromRequest: (req: Request, param: string) => number = (
  req,
  param
) => {
  let value = req.query[param];

  if (typeof value !== 'string') {
    return NaN;
  }

  try {
    const result = parseInt(value);
    return result;
  } catch (e) {
    console.error(`Error extracting parameter ${param}:`, e);
    return NaN;
  }
};

/**
 * Parse a number parameter from a query
 * @param req The request (as given in the controller)
 * @param param The name of the number parameter to get
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
export const getFloatFromRequest: (req: Request, param: string) => number = (
  req,
  param
) => {
  let value = req.query[param];

  if (typeof value !== 'string') {
    return NaN;
  }

  try {
    const result = parseFloat(value);
    return result;
  } catch (e) {
    console.error(`Error extracting parameter ${param}:`, e);
    return NaN;
  }
};

/**
 * Get the "id" parameter from a query
 * @param req The request (as given in the controller)
 * @return the id if it is correct and available, false otherwise
 */
export const getIdParameter: (req: Request) => number  = (
  req
) => {
  let value = req.params.id;

  if (typeof value !== 'string') {
    return NaN;
  }

  try {
    return parseInt(value);
  } catch (e) {
    console.error(`Error extracting id parameter:`, e);
    return NaN;
  }
};

/**
 * Get a parameter from the query
 * @param req The request (as given in the controller)
 * @param param The parameter to get from the request
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
export const getParameterFromRequest: (req: Request, param: string) => string = (
  req,
  param
) => {
  let value = req.query[param] as string;
  return value;
};


/**
 * Extract id from the request query-string
 * @param req The request (as given in the controller)
 * @return the id if the parameter is correct and
 * available, false otherwise
 */
export const getIdFromRequest: (req: Request) => number = (req) => {
  return getNumberFromRequest(req, 'id');
};

/**
 * Get the "id" parameter from a query
 * @param req The request (as given in the controller)
 * @return the id if it is correct and available, false otherwise
 */
export const getNumberParameter: (req: Request, parameter: string) => number = (
  req,
  parameter
) => {
  let value = req.params[parameter];

  if (typeof value !== 'string') {
    return NaN;
  }

  try {
    return parseInt(value);
  } catch (e) {
    console.error(`Error extracting id parameter:`, e);
    return NaN;
  }
};