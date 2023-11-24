import { Repository } from "typeorm";
import { ProductCart } from "./entities/productCart.entity";
import { IProductCartServiceFindOne } from "./interfaces/products-carts-service.interface";
export declare class ProductsCartsService {
    private readonly productsCartRepository;
    constructor(productsCartRepository: Repository<ProductCart>);
    findAll(): Promise<ProductCart[]>;
    findOne({ productId }: IProductCartServiceFindOne): Promise<ProductCart>;
    create(user: string, name: string, quantity: number, price: number): Promise<ProductCart>;
}
