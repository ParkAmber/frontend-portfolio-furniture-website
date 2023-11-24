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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const productsFiles_service_1 = require("../productsFiles/productsFiles.service");
const productsSaleslocations_service_1 = require("../productsSaleslocations/productsSaleslocations.service");
const productsTags_service_1 = require("../productsTags/productsTags.service");
const bestProduct_entity_1 = require("./entities/bestProduct.entity");
let BestProductsService = class BestProductsService {
    constructor(productsRepository, productsSaleslocationsService, productsTagsService, productsFilesService) {
        this.productsRepository = productsRepository;
        this.productsSaleslocationsService = productsSaleslocationsService;
        this.productsTagsService = productsTagsService;
        this.productsFilesService = productsFilesService;
    }
    findAll() {
        return this.productsRepository.find({
            relations: ['productCategory', 'files'],
        });
    }
    findOne({ productId }) {
        return this.productsRepository.findOne({
            where: { id: productId },
            relations: ['productCategory', 'productTags', 'files'],
        });
    }
    async create({ createBestProductInput }) {
        const { productCategoryId, productTags, files } = createBestProductInput, rest = __rest(createBestProductInput, ["productCategoryId", "productTags", "files"]);
        const tagNames = productTags.map((el => el.replace("#", "")));
        const prevTags = await this.productsTagsService.findByNames({ tagNames });
        const temp = [];
        tagNames.forEach(el => {
            const isExists = prevTags.find(prevEl => el === prevEl.name);
            if (!isExists)
                temp.push({ name: el });
        });
        const newTags = await this.productsTagsService.bulkInsert({ names: temp });
        const tags = [...prevTags, ...newTags.identifiers];
        const fileNames = files.map((el => el));
        const prevFiles = await this.productsFilesService.findByNames({ fileNames });
        console.log(fileNames);
        console.log("=====", prevFiles);
        const fileTemp = [];
        fileNames.forEach(el => {
            const isExists = prevFiles.find(prevEl => el === prevEl.name);
            if (!isExists)
                fileTemp.push({ name: el });
        });
        const newFiles = await this.productsFilesService.bulkInsert({ names: fileTemp });
        const files2 = [...prevFiles, ...newFiles.identifiers];
        console.log(tags, files2, fileTemp, newFiles);
        const result2 = this.productsRepository.save(Object.assign(Object.assign({}, rest), { productCategory: {
                id: productCategoryId,
            }, productTags: tags, files: files2 }));
        return result2;
    }
    async update({ productId, updateBestProductInput }) {
        const bestProduct = await this.findOne({ productId });
        this.checkSoldout({ bestProduct });
        const { productTags, files } = updateBestProductInput, rest = __rest(updateBestProductInput, ["productTags", "files"]);
        console.log(productTags);
        const tagNames = productTags.map((el => el.replace("#", "")));
        const prevTags = await this.productsTagsService.findByNames({ tagNames });
        const temp = [];
        tagNames.forEach(el => {
            const isExists = prevTags.find(prevEl => el === prevEl.name);
            if (!isExists)
                temp.push({ name: el });
        });
        const newTags = await this.productsTagsService.bulkInsert({ names: temp });
        const tags = [...prevTags, ...newTags.identifiers];
        const fileNames = files.map((el => el));
        const prevFiles = await this.productsFilesService.findByNames({ fileNames });
        console.log(fileNames);
        console.log("=====", prevFiles);
        const fileTemp = [];
        fileNames.forEach(el => {
            const isExists = prevFiles.find(prevEl => el === prevEl.name);
            if (!isExists)
                fileTemp.push({ name: el });
        });
        const newFiles = await this.productsFilesService.bulkInsert({ names: fileTemp });
        const files2 = [...prevFiles, ...newFiles.identifiers];
        console.log(tags, files2, fileTemp, newFiles);
        const result = this.productsRepository.save(Object.assign(Object.assign(Object.assign({}, bestProduct), updateBestProductInput), { productTags: tags, files: files2 }));
        return result;
    }
    checkSoldout({ bestProduct }) {
        if (bestProduct.isSoldout) {
            throw new common_1.UnprocessableEntityException("it is already soldout");
        }
    }
    async delete({ productId }) {
        const result = await this.productsRepository.softDelete({ id: productId });
        return result.affected ? true : false;
    }
    findAllwithDeleted() {
        return this.productsRepository.find({
            withDeleted: true
        });
    }
    findDeleted() {
        return this.productsRepository.find({
            where: {
                deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
            },
            withDeleted: true,
        });
    }
    async restoreDeleted({ productId }) {
        const restoreResponse = await this.productsRepository.restore(productId);
        return restoreResponse.affected ? true : false;
    }
};
BestProductsService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, typeorm_1.InjectRepository)(bestProduct_entity_1.BestProduct)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        productsSaleslocations_service_1.ProductsSalesLocationsService,
        productsTags_service_1.ProductsTagsService,
        productsFiles_service_1.ProductsFilesService])
], BestProductsService);
exports.BestProductsService = BestProductsService;
//# sourceMappingURL=bestProducts.service.js.map