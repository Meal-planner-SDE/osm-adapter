"use strict";
/*********
 * Type definitions
 *   TypeScript interfaces and types should be defined here!
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = exports.Area = void 0;
class Area {
    constructor(data) {
        this.display_name = data.display_name;
        this.s = data.boundingbox[0];
        this.n = data.boundingbox[1];
        this.w = data.boundingbox[2];
        this.e = data.boundingbox[3];
    }
}
exports.Area = Area;
class Shop {
    constructor(data) {
        this.lat = data.lat;
        this.lon = data.lon;
        this.name = data.tags.name;
        this.shop = data.tags.shop;
    }
}
exports.Shop = Shop;
