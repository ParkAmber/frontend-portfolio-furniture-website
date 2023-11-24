import { Repository } from "typeorm";
import { ProductTag } from "./entities/productTag.entity";
import { IProductsTagsServiceFindByNames, IProductsTgasServiceBulkInsert } from "./interfaces/products-tags-service.interface";
export declare class ProductsTagsService {
    private readonly productsTagsRepository;
    constructor(productsTagsRepository: Repository<ProductTag>);
    findByNames({ tagNames }: IProductsTagsServiceFindByNames): Promise<ProductTag[]>;
    bulkInsert({ names }: IProductsTgasServiceBulkInsert): Promise<import("typeorm").InsertResult>;
}
