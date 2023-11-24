import { Repository } from "typeorm";
import { ProductFile } from "./entities/productFile.entity";
import { IProductsFilesServiceBulkInsert, IProductsFilesServiceFindByNames } from "./interfaces/files-service.interface";
export declare class ProductsFilesService {
    private readonly productsFilesRepository;
    constructor(productsFilesRepository: Repository<ProductFile>);
    findByNames({ fileNames }: IProductsFilesServiceFindByNames): Promise<ProductFile[]>;
    bulkInsert({ names }: IProductsFilesServiceBulkInsert): Promise<import("typeorm").InsertResult>;
}
