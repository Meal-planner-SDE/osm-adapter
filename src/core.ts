/*********
 * Core functionalities
 *   All the processing logics are defined here. In this way, we leave in the
 *   controller all the input/output filtering and selection, and here we write
 *   the "raw" logics. In this way they're also re-usable! :)
 *   Obviously, in a real project, those functionalities should be divided as well.
 *   "Core" is not a fixed word for this type of file, sometimes
 *   people put those functions in a Utils file, sometimes in a Helper
 *   file, sometimes in a Services folder with different files for every service..
 *   It really depends on your project, style and personal preference :)
 */

import { Error, AreaRaw, Area, ShopsQuery, ShopRaw, Shop, ShopsResult} from './types';
import config from '../config';
import qs from 'qs';

import axios from 'axios';
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { indices: false });
};

/**
 * Search for recipes matching a certain query
 * @param query the address to be searched
 */
export const searchArea: (query : string) => Promise<Area | Error> = async (query) => {
  try {
    const results = await axios.get<AreaRaw[]>(`${config.NOMINATIM_API_ENDPOINT}/search`, {
      params: {
        q: query,
        format: "json",
        polygon:1,
        limit:1
      }
    });
    if (results.data.length == 0)
      throw new Error(`Address '${query}' not found`);
    return new Area(results.data[0]);
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
};

export const searchShops: (query : ShopsQuery) => Promise<ShopsResult[] | Error> = async (query) => {
  const body = `
  [out:json];
  (${query.categories.map(
      category => `node [shop=${category}] 
                    (${query.area.s},${query.area.w},${query.area.n},${query.area.e});`
    ).join('\n')}
  );
  out;
  `
  return findShops(body);
};


export const searchShopsByCoord: (
  lat:number, lon:number, categories : string[]) => 
    Promise<ShopsResult[] | Error> = async (lat, lon, categories) => {
  const RADIUS = 2000;
  console.log(categories);
  const body = `
  [out:json];
  (${categories.map(
      category => `node [shop=${category}] 
                    (around: ${RADIUS},${lat},${lon});`
    ).join('\n')}
  );
  out;
`
  console.log(body);
  return findShops(body);
};

const findShops: (body: string) => Promise<ShopsResult[] | Error> = async (body) => {
  try{
    const query_results = await axios.post<{elements: ShopRaw[]}>(`${config.OVERPASS_API_ENDPOINT}/search`, body,
    {
      headers: { 
        'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
        'Content-Type' : 'text/plain' 
      }
    });
    let result = {} as {[key: string]: ShopsResult};
    console.log('results:')
    console.log(query_results.data.elements)
    for (let shop_res of query_results.data.elements){
      if (!(shop_res.tags.shop in result)){
        result[shop_res.tags.shop] = {category: shop_res.tags.shop, shops: []} as ShopsResult;
      }
      result[shop_res.tags.shop].shops.push(new Shop(shop_res));
    }
    return Object.values(result);
  } catch (e) {
    console.error(e);
    return {
      error: e.toString(),
    };
  }
}
