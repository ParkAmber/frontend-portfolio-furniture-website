import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProductTag } from "./entities/productTag.entity";
import { IProductsTagsServiceFindByNames, IProductsTgasServiceBulkInsert } from "./interfaces/products-tags-service.interface";

// interface IProductsTgasServiceBulkInsert{
//     names: {
//         name: string
//     }[]
// }
// interface IProductsTagsServiceFindByNames{
//     tagNames: string[]
// }

@Injectable()
export class ProductsTagsService{
    constructor(
        @InjectRepository(ProductTag)
        private readonly productsTagsRepository:Repository<ProductTag>
    ){}
    findByNames({tagNames}: IProductsTagsServiceFindByNames) {
       return  this.productsTagsRepository.find({
            where: {name: In(tagNames)} //tagNames에서 이미 db에있는거 찾아줌 ex)[{id:"ID~", name: "chair"}]
        })
    }

    bulkInsert({names}: IProductsTgasServiceBulkInsert) {
      return  this.productsTagsRepository.insert(names)
    }
}