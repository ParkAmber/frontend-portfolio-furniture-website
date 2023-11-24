import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, IsNull, Not, Repository } from "typeorm";
import { ProductsFilesService } from "../productsFiles/productsFiles.service";
import { ProductsSalesLocationsService } from "../productsSaleslocations/productsSaleslocations.service";
import { ProductsTagsService } from "../productsTags/productsTags.service";
// import { UpdateProductInput } from "./dto/update-product.input";
import { Product } from "./entities/product.entity";
// import { ProductCart } from "./entities/productCart.entity";
import { FetchProductsArgs, IProductCheckSoldout, IProductServiceCreate, IProductServiceDelete, IProductServiceFindAll, IProductServiceFindOne, IProductServiceUpdate } from "./interfaces/products-service.interface";
// interface IProductServiceCreate{
//     createProductInput: CreateProductInput
// }
// interface IProductServiceFindOne{
//     productId: string;
// }
// interface IProductServiceUpdate{
//     productId: string,
//     updateProductInput: UpdateProductInput
// }
// interface IProductCheckSoldout{
//     product: Product
// }
@Injectable({})
export class ProductsService{
    //db저장하기위한 세팅
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        // private readonly productsCartRepository: Repository<ProductCart>,

        private readonly productsSaleslocationsService: ProductsSalesLocationsService,
        private readonly productsTagsService: ProductsTagsService,
        private readonly productsFilesService: ProductsFilesService,
    ) { }

    //데이터 조회=> nest.js에서는 await안해도 자동으로 기다려줌(but express.js에선 await해줘야함!!)

    findAll(args: FetchProductsArgs): Promise<Product[]>{
        // const skip = args.page * args.perPage; // Calculate the number of items to skip
        // const take = args.perPage; // Define how many items to take
        let skip: number = (args.page * 9) - 9;
        let whereConditions = {};

        if (!args.page) {
            skip = 0
        }
      if (args.search) {
    // Define your search criteria here, e.g., for a case-insensitive search:
            whereConditions = {
            name: ILike(`%${args.search}%`),
                    };
      }
        
        console.log("===========SEARCH:===", args, args.search, args.page, skip)
        return this.productsRepository.find({
            where: whereConditions,
           
            // relations: ['productSaleslocation', 'productCategory'],//productSaleslocation, product들 합쳐서 가져오기!
            relations: ['productCategory', 'productTags', 'files'],
            skip, // Skip the first 9 items
            take: 9, // Take the next 9 items
        })
    }
    findOne({productId}: IProductServiceFindOne):Promise<Product>{
        return this.productsRepository.findOne({
            where: { id: productId },
            // relations: ['productSaleslocation','productCategory','productTags'],//producsSaleslocation, product들 합쳐서 가져오기!
            relations: ['productCategory', 'productTags', 'files'],
        })
    }
    findAllByCategory(args: FetchProductsArgs): Promise<Product[]>{
        // const skip = args.page * args.perPage; // Calculate the number of items to skip
        // const take = args.perPage; // Define how many items to take
       let skip: number = (args.page * 10) - 10;
        let whereConditions = {};

        if (!args.page) {
            skip = 0
        }
      if (args.search) {
    // Define your search criteria here, e.g., for a case-insensitive search:
            whereConditions = {
                productCategory: {
                    name: ILike(`%${args.search}%`)
                },
                    };
      }
        
        console.log("===========SEARCH:===", args, args.search, args.page, skip, whereConditions)
        return this.productsRepository.find({
            where: whereConditions,
           
            // relations: ['productSaleslocation', 'productCategory'],//productSaleslocation, product들 합쳐서 가져오기!
            relations: ['productCategory', 'productTags', 'files'],
            skip, // Skip the first 10 items
            take: 10, // Take the next 10 items
        })
    }
    async findAllCount(args: FetchProductsArgs): Promise<number> {
        let whereConditions = {};
        if (args.search) {
            // Define your search criteria here, e.g., for a case-insensitive search:
                    whereConditions = {
                    name: ILike(`%${args.search}%`),
                            };
              }
        const resultCount = await this.productsRepository.find({  
            where: whereConditions,
         })
        console.log(resultCount.length)
        const totalCount = resultCount.length
        return totalCount
    }
    //데이터 생성
  async create({createProductInput}: IProductServiceCreate): Promise<Product> {
        // const { productSaleslocation, productCategoryId,productTags, ...rest } = createProductInput
        const {  productCategoryId,productTags,files, ...rest } = createProductInput
        // const result = await this.productsSaleslocationsService.create({productSaleslocation })
    // const result = await this.productSaleslocationRepository.save({
    //     ...productSaleslocation
    //   }) ==> 이거는 따로 빼줬음!!=> repository에 여기저기서 직접접근하면 로직 통일X!
        
        //2-2)상품태그 등록(ex)["#chair", "#Toronto", "#cozy"]
        const tagNames = productTags.map((el => el.replace("#", ""))) // ["chair", "Toronto", "cozy"]
        const prevTags = await this.productsTagsService.findByNames({tagNames}) //tagNames에서 이미 db에있는거 찾아줌 ex)[{id:"ID~", name: "chair"}]
        const temp = [] 
        tagNames.forEach(el => {
            const isExists = prevTags.find(prevEl => el === prevEl.name) // prevEl.name==> chair
            if(!isExists) temp.push({name: el})//[{name: "Toronto"},{name: "cozy"}]
        })

        const newTags = await this.productsTagsService.bulkInsert({names: temp}) //=>(bulk-insert)insert안에는 배열저장가능(save()는 배열안됨!) & for/map문 없이 한꺼번에 저장가능!
        const tags = [...prevTags, ...newTags.identifiers] //ex)[{id:"ID~", name: "chair"},{id:"ID~", name: "Toronto"},{id:"ID~", name: "cozy"}]
        
        //2-3)files 등록(ex)["img1.png", "img2.png", "img3.png"]
          const fileNames = files.map((el => el)) // ["chair", "Toronto", "cozy"]
          const prevFiles = await this.productsFilesService.findByNames({fileNames}) //tagNames에서 이미 db에있는거 찾아줌 ex)[{id:"ID~", name: "chair"}]
         console.log(fileNames)
          
          console.log("=====", prevFiles)
          const fileTemp = [] 
          fileNames.forEach(el => {
              const isExists = prevFiles.find(prevEl => el === prevEl.name) // prevEl.name==> chair
              if(!isExists) fileTemp.push({name: el})//[{name: "Toronto"},{name: "cozy"}]
          })
          const newFiles = await this.productsFilesService.bulkInsert({names: fileTemp}) //=>(bulk-insert)insert안에는 배열저장가능(save()는 배열안됨!) & for/map문 없이 한꺼번에 저장가능!
          const files2 = [...prevFiles, ...newFiles.identifiers] //ex)[{id:"ID~", name: "chair"},{id:"ID~", name: "Toronto"},{id:"ID~", name: "cozy"}]
          console.log(tags, files2, fileTemp,newFiles)
    
        //** HW=> error 해결하기 */
    const result2 =   this.productsRepository.save({
        //         // name: rest.name,
        //         // description: rest.description
        //         // price: rest.price,
        //         // productSaleslocation:{
        //              id:result.id
        //          }
                  ...rest,
                //   productSaleslocation: {
                //     //   id: result.id
                //     //   address: result.address
                      
                //   }
                //   productSaleslocation: result,
                  productCategory: {
                      id: productCategoryId,
                       //category name 받으려면?=> create-product.input.ts에서 category name추가해서 받기!
                      
                  },
                productTags: tags, //id배열이 들어감!
                files: files2
              })
               
              return result2;
  }

   //데이터 수정
    async update({ productId, updateProductInput }: IProductServiceUpdate): Promise<Product> {
        
        //1. 수정할 데이터 찾기
        //this.productsRepository.findOne({ where: { id: productId } }) => this.findOne({productId}) 이게 더 안정함!=> 새로만드는게 아니라 있는거 가져다쓰므로 더 좋고 안전함!
        const product = await this.findOne({ productId })
        
        //2. Soldout 유무 검증하기=> 검증하는 로직은 service.ts에서 해주기!
        this.checkSoldout({ product })

        //3. 수정하기
        const { productTags, files } = updateProductInput
        console.log(productTags)
        const tagNames = productTags.map((el => el.replace("#", ""))) // ["chair", "Toronto", "cozy"]
        const prevTags = await this.productsTagsService.findByNames({tagNames}) //tagNames에서 이미 db에있는거 찾아줌 ex)[{id:"ID~", name: "chair"}]
        const temp = [] //[{name: "Toronto"},{name: "cozy"}]
        tagNames.forEach(el => {
            const isExists = prevTags.find(prevEl => el === prevEl.name) // prevEl.name==> chair
            if(!isExists) temp.push({name: el})
        })

        const newTags = await this.productsTagsService.bulkInsert({names: temp}) //=>(bulk-insert)insert안에는 배열들어가서 저장가능(save()는 배열안됨!) & for/map문 없이 한꺼번에 저장가능!
        const tags = [...prevTags, ...newTags.identifiers] //ex)[{id:"ID~", name: "Toronto"},{id:"ID~", name: "cozy"}]
        //2-3)files 등록(ex)["img1.png", "img2.png", "img3.png"]
          const fileNames = files.map((el => el)) // ["chair", "Toronto", "cozy"]
          const prevFiles = await this.productsFilesService.findByNames({fileNames}) //tagNames에서 이미 db에있는거 찾아줌 ex)[{id:"ID~", name: "chair"}]
         console.log(fileNames)
          
          console.log("=====", prevFiles)
          const fileTemp = [] 
          fileNames.forEach(el => {
              const isExists = prevFiles.find(prevEl => el === prevEl.name) // prevEl.name==> chair
              if(!isExists) fileTemp.push({name: el})//[{name: "Toronto"},{name: "cozy"}]
          })
          const newFiles = await this.productsFilesService.bulkInsert({names: fileTemp}) //=>(bulk-insert)insert안에는 배열저장가능(save()는 배열안됨!) & for/map문 없이 한꺼번에 저장가능!
          const files2 = [...prevFiles, ...newFiles.identifiers] //ex)[{id:"ID~", name: "chair"},{id:"ID~", name: "Toronto"},{id:"ID~", name: "cozy"}]
          console.log(tags, files2, fileTemp,newFiles)
       
       
        const result = this.productsRepository.save({
            // id: product.id,
            // isSoldout: product.isSoldout,
            // name: product.name,
            // description: product.description,
            // price: product.price,

            //여기값이 위에 거를 덮어씀!
            // name: updateProductInput.name,
            // description: updateProductInput.description,
            // price: updateProductInput.price
            // ||
            // ||
            // ||
            ...product, //수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려 받고싶을 때!=> 수정한 데이터만 받아오고싶으면 이건 안써줘도 됨!
        //    ...rest,
            ...updateProductInput,
            productTags: tags, //id배열이 들어감!
            files: files2
        })
       
       return result;
    }

    //Soldout 유무 검증 함수=> 여기저기서 쓸수있으므로 따로 빼줌!
    checkSoldout({product}: IProductCheckSoldout): void {
        if (product.isSoldout) {
            throw new UnprocessableEntityException("it is already soldout")
            }
        //    if (product.isSoldout) {
        //        //HttpStatus.UNPROCESSABLE_ENTITY => 422상태코드
        //     throw new HttpException("it is already soldout", HttpStatus.UNPROCESSABLE_ENTITY)
        //     }
    
    }

         //데이터 삭제
   
         async delete({ productId }: IProductServiceDelete): Promise<boolean> {
            //=>1. 진짜로 삭재하는 방법
           //   const result = await this.productsRepository.delete({id: productId})
           //   return result.affected ? true : false //삭제 잘 됫으면, true 아니면 false 보내주기
           
           //  //=>2. 가짜로 삭재하는 방법(soft delete) - isDeleted
           // this.productsRepository.update({ id: productId }, { isDeleted: true });
   
            //=>3. 가짜로 삭재하는 방법(soft delete) - deletedAt
           //  this.productsRepository.update({ id: productId }, { deletedAt: new Date() });
   
           //=>4. typeorm이 제공헤주는 기능 사용하기(softRemove)=>  find()등 fetch할때 뭐 안해줘도 자동으로 delete된거 빼고 가져옴!
           //                                              => 장점: 여러 id 한번에 삭제가능 ex).softRemove([{ id: aaa }, { id: bbb }, { id: qqq }])
           //                                              => 단점: id로만 삭제 가능!
           // this.productsRepository.softRemove({ id: productId })
           
           //=>5. typeorm이 제공헤주는 기능 사용하기(softDelete) =>find()등 fetch할때 뭐 안해줘도 자동으로 delete된거 빼고 가져옴!
           //                                              => 장점:다른 컬럼으로 삭제가능!
           //                                              => 단점:여러 id 한번에 삭제가능x!
           const result = await this.productsRepository.softDelete({ id: productId })
           return result.affected ? true: false //삭제 잘 됫으면, true 아니면 false 보내주기
         }
    
        //** 삭제한 데이터를 포함해서 모든 상품을 조회
         findAllwithDeleted():Promise<Product[]>{
             return this.productsRepository.find({
                withDeleted:true
            })
         }
        //** 삭제한 데이터 상품을 조회
        findDeleted():Promise<Product[]>{
            return this.productsRepository.find({
                where: {
                    deletedAt: Not(IsNull()),
                  },
                withDeleted: true,
           })
        }   
        //** 삭제한 상품 데이터를 다시 복구 */
        async restoreDeleted({ productId }: IProductServiceDelete): Promise<boolean> {
            const restoreResponse = await this.productsRepository.restore(productId);
            // if (!restoreResponse.affected) {
            //   throw new UnprocessableEntityException("it is already soldout")
            // }
            return restoreResponse.affected ? true: false
         }
}


// ==** 등록, 수정방법
// this.productsRepository.save => 등록, 수정 둘다 가능 & result에서 등록/수정한 데이터를 받아올수있음!(id있으면 수정으로 가고, id없으면 등록으로 작동됨 )
// this.productsRepository.insert => 등록 & result에서 등록한 데이터 받아올수 x!!(그냥 '등록되었음'과 같은 메세지만 받오옴. 등록한 데이터 보려면 fetchBoard등등 query사용해야함!)
// this.productsRepository.update => 수정 & result에서 등록한 데이터 받아올수 x!!(그냥 '수정되었음'과 같은 메세지만 받오옴. 수정한 데이터 보려면 fetchBoard등등 query사용해야함!)
//cf)  this.productsRepository.create => db 접속이랑 관련X!! => 그냥 등록을 위한 빈 껍데기!!