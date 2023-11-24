import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCart } from "./entities/productCart.entity";
// import { User } from "./entities/user.entity";
import { ProductsCartsResolver } from "./products.carts.resolver";
import { ProductsCartsService } from "./products.carts.service";
// import { UsersResolver } from "./users.resolver";
// import { UsersService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductCart,
        ])
    ],
    providers: [
        ProductsCartsResolver,
        ProductsCartsService
        
    ],
    // exports: [
    //     ProductsCartsService
    // ]
})
export class ProductCartsModule{ }