import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { IProductsCategoriesServiceCreate } from './interfaces/products-categories-service.interface';
export declare class ProductsCategoriesService {
    private readonly productsCategoriesRepository;
    constructor(productsCategoriesRepository: Repository<ProductCategory>);
    create({ name }: IProductsCategoriesServiceCreate): Promise<ProductCategory>;
}
