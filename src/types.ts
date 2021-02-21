/*********
 * Type definitions
 *   TypeScript interfaces and types should be defined here!
 */

export interface Error {
  error: any;
}

export const isError = (arg: any): arg is Error => {
  return arg && arg.error;
};

export interface AreaRaw{
  place_id:number,
  licence:string,
  osm_type:string,
  osm_id:number,
  boundingbox:string[],
  lat:string,
  lon:string,
  display_name:string,
  class:string,
  type:string,
  importance:number,
  icon:string
}

export class Area{
  display_name: string;
  s: string;
  w: string;
  n: string;
  e: string;
  constructor(data:AreaRaw){
    this.display_name = data.display_name;
    this.s = data.boundingbox[0];
    this.n = data.boundingbox[1];
    this.w = data.boundingbox[2];
    this.e = data.boundingbox[3];
  }
}

export interface ShopsQuery{
  area: Area,
  categories: string[]
}

export interface ShopsResult{
  category: string,
  shops: Shop[],
}


export interface ShopRaw{
  type: string
  id: number,
  lat: number,
  lon: number,
  tags: {     
      name: string,
      shop: string
  }
}

export class Shop {
  lat: number;
  lon: number;
  name: string;
  shop: string;
  constructor(data:ShopRaw){
    this.lat = data.lat;
    this.lon = data.lon;
    this.name = data.tags.name;
    this.shop = data.tags.shop;
  }
}