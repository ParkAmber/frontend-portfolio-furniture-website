"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCartsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productCart_entity_1 = require("./entities/productCart.entity");
const products_carts_resolver_1 = require("./products.carts.resolver");
const products_carts_service_1 = require("./products.carts.service");
let ProductCartsModule = class ProductCartsModule {
};
ProductCartsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                productCart_entity_1.ProductCart,
            ])
        ],
        providers: [
            products_carts_resolver_1.ProductsCartsResolver,
            products_carts_service_1.ProductsCartsService
        ],
    })
], ProductCartsModule);
exports.ProductCartsModule = ProductCartsModule;
//# sourceMappingURL=products.carts.module.js.map