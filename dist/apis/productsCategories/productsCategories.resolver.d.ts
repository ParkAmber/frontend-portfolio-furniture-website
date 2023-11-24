import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoriesService } from './productsCategories.service';
export declare class ProductsCategoriesResolver {
    private readonly productsCategoriesService;
    constructor(productsCategoriesService: ProductsCategoriesService);
    createProductCategory(name: string): Promise<ProductCategory>;
}
