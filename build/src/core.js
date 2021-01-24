"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchShops = exports.searchArea = void 0;
const types_1 = require("./types");
const config_1 = __importDefault(require("../config"));
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.paramsSerializer = (params) => {
    return qs_1.default.stringify(params, { indices: false });
};
/**
 * Search for recipes matching a certain query
 * @param query the address to be searched
 */
const searchArea = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield axios_1.default.get(`${config_1.default.NOMINATIM_API_ENDPOINT}/search`, {
            params: {
                q: query,
                format: "json",
                polygon: 1,
                limit: 1
            }
        });
        if (results.data.length == 0)
            throw new Error(`Address '${query}' not found`);
        return new types_1.Area(results.data[0]);
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.searchArea = searchArea;
const searchShops = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = `
    [out:json];
    (${query.categories.map(category => `node [shop=${category}] 
                      (${query.area.s},${query.area.w},${query.area.n},${query.area.e});`).join('\n')}
    );
    out;
`;
        const query_results = yield axios_1.default.post(`${config_1.default.OVERPASS_API_ENDPOINT}/search`, body, {
            headers: {
                'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                'Content-Type': 'text/plain'
            }
        });
        let result = {};
        for (let shop_res of query_results.data.elements) {
            if (!(shop_res.tags.shop in result)) {
                result[shop_res.tags.shop] = { category: shop_res.tags.shop, shops: [] };
            }
            result[shop_res.tags.shop].shops.push(new types_1.Shop(shop_res));
        }
        return Object.values(result);
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.searchShops = searchShops;
