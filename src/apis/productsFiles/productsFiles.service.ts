import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProductFile } from "./entities/productFile.entity";
// import { ProductTag } from "./entities/productTag.entity";
import { IProductsFilesServiceBulkInsert, IProductsFilesServiceFindByNames } from "./interfaces/files-service.interface";
// import { IProductsTagsServiceFindByNames, IProductsTgasServiceBulkInsert } from "./interfaces/products-tags-service.interface";

// interface IProductsTgasServiceBulkInsert{
//     names: {
//         name: string
//     }[]
// }
// interface IProductsTagsServiceFindByNames{
//     tagNames: string[]
// }

@Injectable()
export class ProductsFilesService{
    constructor(
        @InjectRepository(ProductFile)
        private readonly productsFilesRepository:Repository<ProductFile>
    ){}
    findByNames({fileNames}: IProductsFilesServiceFindByNames) {
       return  this.productsFilesRepository.find({
            where: {name: In(fileNames)} //tagNames에서 이미 db에있는거 찾아줌 ex)[{id:"ID~", name: "chair"}]
        })
    }
    // async create({ files }) {
    //     const newFiles = this.productsFilesRepository.create({ files })
    //    return await this.productsFilesRepository.save(newFiles);
    // }
    // const newFiles = files.map((name) => this.productsFilesRepository.create({ name }));
    // const insertedFiles = await this.productsFilesRepository.save(newFiles);
    bulkInsert({names}: IProductsFilesServiceBulkInsert) {
      return  this.productsFilesRepository.insert(names)
    }
}