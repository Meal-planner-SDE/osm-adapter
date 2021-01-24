"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShops = exports.getArea = void 0;
const core_1 = require("./core");
const helper_1 = require("./helper");
const getArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = helper_1.getParameterFromRequest(req, 'address');
    res.send(yield core_1.searchArea(query || ""));
});
exports.getArea = getArea;
const getShops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield core_1.searchShops(req.body));
});
exports.getShops = getShops;
