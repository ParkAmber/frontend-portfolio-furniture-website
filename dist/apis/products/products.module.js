"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productFile_entity_1 = require("../productsFiles/entities/productFile.entity");
const productsFiles_service_1 = require("../productsFiles/productsFiles.service");
const productSaleslocation_entity_1 = require("../productsSaleslocations/entities/productSaleslocation.entity");
const productsSaleslocations_service_1 = require("../productsSaleslocations/productsSaleslocations.service");
const productTag_entity_1 = require("../productsTags/entities/productTag.entity");
const productsTags_service_1 = require("../productsTags/productsTags.service");
const product_entity_1 = require("./entities/product.entity");
const products_resolver_1 = require("./products.resolver");
const products_service_1 = require("./products.service");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.Product,
                productSaleslocation_entity_1.ProductSaleslocation,
                productTag_entity_1.ProductTag,
                productFile_entity_1.ProductFile,
            ])
        ],
        providers: [
            products_resolver_1.ProductsResolver,
            products_service_1.ProductsService,
            productsSaleslocations_service_1.ProductsSalesLocationsService,
            productsTags_service_1.ProductsTagsService,
            productsFiles_service_1.ProductsFilesService
        ]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map