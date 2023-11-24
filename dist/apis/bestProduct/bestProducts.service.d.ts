import { Repository } from "typeorm";
import { ProductsFilesService } from "../productsFiles/productsFiles.service";
import { ProductsSalesLocationsService } from "../productsSaleslocations/productsSaleslocations.service";
import { ProductsTagsService } from "../productsTags/productsTags.service";
import { BestProduct } from "./entities/bestProduct.entity";
import { IBestProductCheckSoldout, IBestProductServiceCreate, IBestProductServiceDelete, IBestProductServiceFindOne, IBestProductServiceUpdate } from "./interfaces/best-products-service.interface";
export declare class BestProductsService {
    private readonly productsRepository;
    private readonly productsSaleslocationsService;
    private readonly productsTagsService;
    private readonly productsFilesService;
    constructor(productsRepository: Repository<BestProduct>, productsSaleslocationsService: ProductsSalesLocationsService, productsTagsService: ProductsTagsService, productsFilesService: ProductsFilesService);
    findAll(): Promise<BestProduct[]>;
    findOne({ productId }: IBestProductServiceFindOne): Promise<BestProduct>;
    create({ createBestProductInput }: IBestProductServiceCreate): Promise<BestProduct>;
    update({ productId, updateBestProductInput }: IBestProductServiceUpdate): Promise<BestProduct>;
    checkSoldout({ bestProduct }: IBestProductCheckSoldout): void;
    delete({ productId }: IBestProductServiceDelete): Promise<boolean>;
    findAllwithDeleted(): Promise<BestProduct[]>;
    findDeleted(): Promise<BestProduct[]>;
    restoreDeleted({ productId }: IBestProductServiceDelete): Promise<boolean>;
}
