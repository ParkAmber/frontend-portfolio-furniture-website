import { Repository } from "typeorm";
import { ProductsFilesService } from "../productsFiles/productsFiles.service";
import { ProductsSalesLocationsService } from "../productsSaleslocations/productsSaleslocations.service";
import { ProductsTagsService } from "../productsTags/productsTags.service";
import { Product } from "./entities/product.entity";
import { FetchProductsArgs, IProductCheckSoldout, IProductServiceCreate, IProductServiceDelete, IProductServiceFindOne, IProductServiceUpdate } from "./interfaces/products-service.interface";
export declare class ProductsService {
    private readonly productsRepository;
    private readonly productsSaleslocationsService;
    private readonly productsTagsService;
    private readonly productsFilesService;
    constructor(productsRepository: Repository<Product>, productsSaleslocationsService: ProductsSalesLocationsService, productsTagsService: ProductsTagsService, productsFilesService: ProductsFilesService);
    findAll(args: FetchProductsArgs): Promise<Product[]>;
    findOne({ productId }: IProductServiceFindOne): Promise<Product>;
    findAllByCategory(args: FetchProductsArgs): Promise<Product[]>;
    findAllCount(args: FetchProductsArgs): Promise<number>;
    create({ createProductInput }: IProductServiceCreate): Promise<Product>;
    update({ productId, updateProductInput }: IProductServiceUpdate): Promise<Product>;
    checkSoldout({ product }: IProductCheckSoldout): void;
    delete({ productId }: IProductServiceDelete): Promise<boolean>;
    findAllwithDeleted(): Promise<Product[]>;
    findDeleted(): Promise<Product[]>;
    restoreDeleted({ productId }: IProductServiceDelete): Promise<boolean>;
}
