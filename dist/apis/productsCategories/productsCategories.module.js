"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productCategory_entity_1 = require("./entities/productCategory.entity");
const productsCategories_resolver_1 = require("./productsCategories.resolver");
const productsCategories_service_1 = require("./productsCategories.service");
let ProductsCategoriesModule = class ProductsCategoriesModule {
};
ProductsCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                productCategory_entity_1.ProductCategory,
            ]),
        ],
        providers: [
            productsCategories_resolver_1.ProductsCategoriesResolver,
            productsCategories_service_1.ProductsCategoriesService,
        ],
    })
], ProductsCategoriesModule);
exports.ProductsCategoriesModule = ProductsCategoriesModule;
//# sourceMappingURL=productsCategories.module.js.map