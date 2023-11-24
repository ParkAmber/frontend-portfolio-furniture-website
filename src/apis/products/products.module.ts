import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductFile } from "../productsFiles/entities/productFile.entity";
import { ProductsFilesService } from "../productsFiles/productsFiles.service";
import { ProductSaleslocation } from "../productsSaleslocations/entities/productSaleslocation.entity";
import { ProductsSalesLocationsService } from "../productsSaleslocations/productsSaleslocations.service";
import { ProductTag } from "../productsTags/entities/productTag.entity";
import { ProductsTagsService } from "../productsTags/productsTags.service";
import { Product } from "./entities/product.entity";
import { ProductsResolver } from "./products.resolver";
import { ProductsService } from "./products.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductSaleslocation,
            ProductTag,
            ProductFile,
        ])
    ],
    providers:[
        ProductsResolver,
        ProductsService,
        ProductsSalesLocationsService,
        ProductsTagsService,
        ProductsFilesService
    ]
})
export class ProductsModule{ }