import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";
import { Product } from "./entities/product.entity";
import { FetchProductsArgs } from "./interfaces/products-service.interface";
import { ProductsService } from "./products.service";
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    fetchProducts(args: FetchProductsArgs): Promise<Product[]>;
    fetchProductsByCategory(args: FetchProductsArgs): Promise<Product[]>;
    fetchProduct(productId: string): Promise<Product>;
    fetchProductsCount(args: FetchProductsArgs): Promise<number>;
    createProduct(createProductInput: CreateProductInput): Promise<Product>;
    updateProduct(productId: string, updateProductInput: UpdateProductInput): Promise<Product>;
    deleteProduct(productId: string): Promise<boolean>;
    fetchProductsWithDeleted(): Promise<Product[]>;
    fetchDeletedProducts(): Promise<Product[]>;
    restoreItems(productId: string): Promise<boolean>;
}
