import { Repository } from "typeorm";
import { ProductSaleslocation } from "./entities/productSaleslocation.entity";
export declare class ProductsSalesLocationsService {
    private readonly productSaleslocationsRepository;
    constructor(productSaleslocationsRepository: Repository<ProductSaleslocation>);
    create({ productSaleslocation }: {
        productSaleslocation: any;
    }): Promise<any>;
}
