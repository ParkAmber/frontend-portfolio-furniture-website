
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateProductInput } from "./dto/create-product.input";
import { UpdateProductInput } from "./dto/update-product.input";

import { Product } from "./entities/product.entity";
import { FetchProductsArgs } from "./interfaces/products-service.interface";
import { ProductsService } from "./products.service";
//** ==== API들!!
@Resolver()
export class ProductsResolver{
    constructor(private readonly productsService: ProductsService) {
        
    }

    //get API
    //여러개 조회
   
    @Query(()=> [Product])   
   fetchProducts(
      @Args() args: FetchProductsArgs): Promise<Product[]>{
       return this.productsService.findAll(args)
    }
   //category 
    @Query(()=> [Product])   
    fetchProductsByCategory(
       @Args() args: FetchProductsArgs): Promise<Product[]>{
       console.log("ARGS?????!!!!==========!!!",args)
        return this.productsService.findAllByCategory(args)
     }
    //1개 조회
    @Query(()=> Product)
    fetchProduct(
        @Args("productId") productId: string):Promise<Product> {
       return this.productsService.findOne({productId})
    }
    //개수 조회
    @Query(()=> Int)
    fetchProductsCount(
      @Args() args: FetchProductsArgs): Promise<number>{
         return this.productsService.findAllCount(args)
    }
    //post API
    @Mutation(() => Product)
    createProduct(
        @Args("createProductInput") createProductInput: CreateProductInput
    ): Promise<Product> {
    //브라우저에 결과 보내주는 방법=> 1. 등록된 내용이 담긴 객채를 그대로 브라우저에 돌려보내주기!
    //                      => 2.결과메세지만 보내주기 ex)return 'post success!'      
    return this.productsService.create({createProductInput})
    }
   
    
    //update API
    @Mutation(() => Product)
    updateProduct(
        @Args("productId") productId: string,
        @Args("updateProductInput") updateProductInput: UpdateProductInput
    ):Promise<Product> {
       return this.productsService.update({productId, updateProductInput})
    }

    //delete API
    @Mutation(() => Boolean)
    deleteProduct(
         @Args("productId") productId: string
    ):Promise<boolean> {
       return this.productsService.delete({productId})
    }

    //삭제한 데이터를 포함해서 모든 상품을 조회 API
    @Query(()=> [Product])   
    fetchProductsWithDeleted():Promise<Product[]> {
       return this.productsService.findAllwithDeleted()
    }
    //삭제한 데이터 조회 API
    @Query(()=> [Product])   
    fetchDeletedProducts():Promise<Product[]> {
       return this.productsService.findDeleted()
    }
    //삭제한 상품 데이터를 다시 복구하는 API 
    @Mutation(() => Boolean)
    restoreItems(
        @Args("productId") productId: string
    ):Promise<boolean> {
      return this.productsService.restoreDeleted({productId})
    }
 }