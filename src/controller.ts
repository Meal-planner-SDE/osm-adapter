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
  getFloatFromRequest,
  getParameterFromRequest,
} from './helper';

import {
  isError
} from './types'

export const getArea = async (req: Request, res: Response) => {
  const query = getParameterFromRequest(req, 'address');
  if (query === undefined){
    res.status(400);
    res.send({'error': 'invalid value for parameter address'})
  } else {
    let area = await searchArea(query);
    if(isError(area)){
      res.status(400);
    }
    res.send(area);
  }
};


export const getShops = async (req: Request, res:Response) => {
  let shops = await searchShops(req.body);
  if(isError(shops)){
    res.status(400);
  }
  res.send(shops);
}

export const getShopsByCoord = async (req: Request, res:Response) => {
  const lat = getFloatFromRequest(req, 'lat');
  const lon = getFloatFromRequest(req, 'lon');

  if (isNaN(lat) || isNaN(lon)){
    res.status(400);
    res.send({"error": "lat and lon must be valid floats."});
  } else {
    let shops = await searchShopsByCoord(lat, lon, req.body);
    if(isError(shops)){
      res.status(400);
    }
    res.send(shops);
  }
}