import { CreateBestProductInput } from "./dto/create-best-product.input";
import { UpdateBestProductInput } from "./dto/update-best-product.input";
import { BestProduct } from "./entities/bestProduct.entity";
import { BestProductsService } from "./bestProducts.service";
export declare class ProductsBestResolver {
    private readonly bestProductsService;
    constructor(bestProductsService: BestProductsService);
    fetchBestProducts(): Promise<BestProduct[]>;
    fetchBestProduct(productId: string): Promise<BestProduct>;
    createBestProduct(createBestProductInput: CreateBestProductInput): Promise<BestProduct>;
    updateBestProduct(productId: string, updateBestProductInput: UpdateBestProductInput): Promise<BestProduct>;
    deleteBestProduct(productId: string): Promise<boolean>;
    fetchBestProductsWithDeleted(): Promise<BestProduct[]>;
    fetchDeletedBestProducts(): Promise<BestProduct[]>;
    restoreBestItems(productId: string): Promise<boolean>;
}
