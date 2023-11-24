import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductFile } from "../productsFiles/entities/productFile.entity";
import { ProductsFilesService } from "../productsFiles/productsFiles.service";
import { ProductSaleslocation } from "../productsSaleslocations/entities/productSaleslocation.entity";
import { ProductsSalesLocationsService } from "../productsSaleslocations/productsSaleslocations.service";
import { ProductTag } from "../productsTags/entities/productTag.entity";
import { ProductsTagsService } from "../productsTags/productsTags.service";
import { BestProduct } from "./entities/bestProduct.entity";
import { ProductsBestResolver } from "./bestProducts.resolver";
import { BestProductsService } from "./bestProducts.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BestProduct,
            ProductSaleslocation,
            ProductTag,
            ProductFile,
        ])
    ],
    providers:[
        ProductsBestResolver,
        BestProductsService,
        ProductsSalesLocationsService,
        ProductsTagsService,
        ProductsFilesService
    ]
})
export class BestProductsModule{ }