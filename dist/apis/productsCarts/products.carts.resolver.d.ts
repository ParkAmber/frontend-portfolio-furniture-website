import { ProductCart } from "./entities/productCart.entity";
import { ProductsCartsService } from "./products.carts.service";
export declare class ProductsCartsResolver {
    private readonly productsCartsService;
    constructor(productsCartsService: ProductsCartsService);
    fetchCarts(): Promise<ProductCart[]>;
    fetchCart(productId: string): Promise<ProductCart>;
    createCart(user: string, name: string, quantity: number, price: number): Promise<ProductCart>;
}
