
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { CreateProductInput } from "../products/dto/create-product.input";
import { UpdateProductInput } from "../products/dto/update-product.input";

import { Product } from "../products/entities/product.entity";
import { ProductCart } from "./entities/productCart.entity";

import { ProductsCartsService } from "./products.carts.service";
//** ==== API들!!
@Resolver()
export class ProductsCartsResolver{
    constructor(private readonly productsCartsService: ProductsCartsService) {
        
    }

    //get API
    //여러개 조회
    @UseGuards(GqlAuthGuard('myAuthorization'))
    @Query(()=> [ProductCart])   
    fetchCarts():Promise<ProductCart[]> {
       return this.productsCartsService.findAll()
    }
    
   //  //1개 조회
   @UseGuards(GqlAuthGuard('myAuthorization'))
    @Query(()=> ProductCart)
    fetchCart(
        @Args("productId") productId: string):Promise<ProductCart> {
       return this.productsCartsService.findOne({productId})
    }

    //post API
    @UseGuards(GqlAuthGuard('myAuthorization'))
    @Mutation((()=> ProductCart))
    createCart(
      //   @Args("createBoardInput") createBoardInput:CreateBoardInput
      @Args("user") user: string,
        @Args("name") name: string,
       @Args("quantity") quantity: number,
       @Args("price") price: number,
      //   @Args({name: "contents" ,nullable: true}) contentsaa: string, //{nullable: true}=> 값 필수아님!(즉, !없애주는것)
    ): Promise<ProductCart> {
        return this.productsCartsService.create(user,name,quantity,price) //"게시물 등록 성공!!"
      //   return this.boardsService.create({ createBoardInput }); //"게시물 등록 성공!!"
    }
   
    
   //  //update API
   //  @Mutation(() => Product)
   //  updateProduct(
   //      @Args("productId") productId: string,
   //      @Args("updateProductInput") updateProductInput: UpdateProductInput
   //  ):Promise<Product> {
   //     return this.productsService.update({productId, updateProductInput})
   //  }

   //  //delete API
   //  @Mutation(() => Boolean)
   //  deleteProduct(
   //       @Args("productId") productId: string
   //  ):Promise<boolean> {
   //     return this.productsService.delete({productId})
   //  }

   //  //삭제한 데이터를 포함해서 모든 상품을 조회 API
   //  @Query(()=> [Product])   
   //  fetchProductsWithDeleted():Promise<Product[]> {
   //     return this.productsService.findAllwithDeleted()
   //  }
   //  //삭제한 데이터 조회 API
   //  @Query(()=> [Product])   
   //  fetchDeletedProducts():Promise<Product[]> {
   //     return this.productsService.findDeleted()
   //  }
   //  //삭제한 상품 데이터를 다시 복구하는 API 
   //  @Mutation(() => Boolean)
   //  restoreItems(
   //      @Args("productId") productId: string
   //  ):Promise<boolean> {
   //    return this.productsService.restoreDeleted({productId})
   //  }
 }