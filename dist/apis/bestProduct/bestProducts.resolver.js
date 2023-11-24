"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsBestResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_best_product_input_1 = require("./dto/create-best-product.input");
const update_best_product_input_1 = require("./dto/update-best-product.input");
const bestProduct_entity_1 = require("./entities/bestProduct.entity");
const bestProducts_service_1 = require("./bestProducts.service");
let ProductsBestResolver = class ProductsBestResolver {
    constructor(bestProductsService) {
        this.bestProductsService = bestProductsService;
    }
    fetchBestProducts() {
        return this.bestProductsService.findAll();
    }
    fetchBestProduct(productId) {
        return this.bestProductsService.findOne({ productId });
    }
    createBestProduct(createBestProductInput) {
        return this.bestProductsService.create({ createBestProductInput });
    }
    updateBestProduct(productId, updateBestProductInput) {
        return this.bestProductsService.update({ productId, updateBestProductInput });
    }
    deleteBestProduct(productId) {
        return this.bestProductsService.delete({ productId });
    }
    fetchBestProductsWithDeleted() {
        return this.bestProductsService.findAllwithDeleted();
    }
    fetchDeletedBestProducts() {
        return this.bestProductsService.findDeleted();
    }
    restoreBestItems(productId) {
        return this.bestProductsService.restoreDeleted({ productId });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [bestProduct_entity_1.BestProduct]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsBestResolver.prototype, "fetchBestProducts", null);
__decorate([
    (0, graphql_1.Query)(() => bestProduct_entity_1.BestProduct),
    __param(0, (0, graphql_1.Args)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsBestResolver.prototype, "fetchBestProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => bestProduct_entity_1.BestProduct),
    __param(0, (0, graphql_1.Args)("createBestProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_best_product_input_1.CreateBestProductInput]),
    __metadata("design:returntype", Promise)
], ProductsBestResolver.prototype, "createBestProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => bestProduct_entity_1.BestProduct),
    __param(0, (0, graphql_1.Args)("productId")),
    __param(1, (0, graphql_1.Args)("updateBestProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_best_product_input_1.UpdateBestProductInput]),
    __metadata("design:returntype", Promise)
], ProductsBestResolver.prototype, "updateBestProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsBestResolver.prototype, "deleteBestProduct", null);
__decorate([
    (0, graphql_1.Query)(() => [bestProduct_entity_1.BestProduct]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsBestResolver.prototype, "fetchBestProductsWithDeleted", null);
__decorate([
    (0, graphql_1.Query)(() => [bestProduct_entity_1.BestProduct]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsBestResolver.prototype, "fetchDeletedBestProducts", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsBestResolver.prototype, "restoreBestItems", null);
ProductsBestResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [bestProducts_service_1.BestProductsService])
], ProductsBestResolver);
exports.ProductsBestResolver = ProductsBestResolver;
//# sourceMappingURL=bestProducts.resolver.js.map