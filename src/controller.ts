/*********
 * Main controller
 *   Here you can define all the processing logics of your endpoints.
 *   It's a good approach to keep in here only the elaboration of the inputs
 *   and outputs, with complex logics inside other functions to improve
 *   reusability and maintainability. In this case, we've defined the complex
 *   logics inside the core.ts file!
 *   In a huge project, you should have multiple controllers, divided
 *   by the domain of the operation.
 */

import { Request, Response } from 'express';

import {
  searchArea,
  searchShops,
  searchShopsByCoord
} from './core';
import {
  getNumberParameter,
  getParameterFromRequest,
} from './helper';

export const getArea = async (req: Request, res: Response) => {
  const query = getParameterFromRequest(req, 'address');
  res.send(await searchArea(query || ""));
};


export const getShops = async (req: Request, res:Response) => {
  res.send(await searchShops(req.body));
}

export const getShopsByCoord = async (req: Request, res:Response) => {
  const lat = getNumberParameter(req, 'lat');
  const lon = getNumberParameter(req, 'lon');
  if (lat !== false && lon !== false){
    res.send(await searchShopsByCoord(lat, lon, req.body));
  } else {
    res.status(400);
    res.send({"error": "Invalid lat or lon parameters."});
  }
}