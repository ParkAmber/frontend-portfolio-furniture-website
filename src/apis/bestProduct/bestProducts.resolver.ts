
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateBestProductInput } from "./dto/create-best-product.input";
import { UpdateBestProductInput } from "./dto/update-best-product.input";

import { BestProduct } from "./entities/bestProduct.entity";
import { BestProductsService} from "./bestProducts.service";
//** ==== API들!!
@Resolver()
export class ProductsBestResolver{
    constructor(private readonly bestProductsService: BestProductsService) {
        
    }

    //get API
    //여러개 조회
    @Query(()=> [BestProduct])   
    fetchBestProducts():Promise<BestProduct[]> {
       return this.bestProductsService.findAll()
    }
    
    //1개 조회
    @Query(()=> BestProduct)
    fetchBestProduct(
        @Args("productId") productId: string):Promise<BestProduct> {
       return this.bestProductsService.findOne({productId})
    }

    //post API
    @Mutation(() => BestProduct)
    createBestProduct(
        @Args("createBestProductInput") createBestProductInput: CreateBestProductInput
    ): Promise<BestProduct> {
    //브라우저에 결과 보내주는 방법=> 1. 등록된 내용이 담긴 객채를 그대로 브라우저에 돌려보내주기!
    //                      => 2.결과메세지만 보내주기 ex)return 'post success!'      
    return this.bestProductsService.create({createBestProductInput})
    }
   
    
    //update API
    @Mutation(() => BestProduct)
    updateBestProduct(
        @Args("productId") productId: string,
        @Args("updateBestProductInput") updateBestProductInput: UpdateBestProductInput
    ):Promise<BestProduct> {
       return this.bestProductsService.update({productId, updateBestProductInput})
    }

    //delete API
    @Mutation(() => Boolean)
    deleteBestProduct(
         @Args("productId") productId: string
    ):Promise<boolean> {
       return this.bestProductsService.delete({productId})
    }

    //삭제한 데이터를 포함해서 모든 상품을 조회 API
    @Query(()=> [BestProduct])   
    fetchBestProductsWithDeleted():Promise<BestProduct[]> {
       return this.bestProductsService.findAllwithDeleted()
    }
    //삭제한 데이터 조회 API
    @Query(()=> [BestProduct])   
    fetchDeletedBestProducts():Promise<BestProduct[]> {
       return this.bestProductsService.findDeleted()
    }
    //삭제한 상품 데이터를 다시 복구하는 API 
    @Mutation(() => Boolean)
    restoreBestItems(
        @Args("productId") productId: string
    ):Promise<boolean> {
      return this.bestProductsService.restoreDeleted({productId})
    }
 }