import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductSaleslocation } from "./entities/productSaleslocation.entity";

@Injectable()
export class ProductsSalesLocationsService{
    constructor(
        //db저장하기위한 세팅
        @InjectRepository(ProductSaleslocation)
        private readonly productSaleslocationsRepository: Repository<ProductSaleslocation>) {
        
    }
    create({productSaleslocation}) {
       return this.productSaleslocationsRepository.save({
            ...productSaleslocation
          })
            
    }
}