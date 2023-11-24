
import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoriesService } from './productsCategories.service';

@Resolver()
export class ProductsCategoriesResolver {
  constructor(
    private readonly productsCategoriesService: ProductsCategoriesService, //
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ): Promise<ProductCategory> {
    return this.productsCategoriesService.create({ name });
  }

  @Query(() => [ProductCategory])
  fetchProductCategory(): Promise<ProductCategory[]> {
    return this.productsCategoriesService.findAll()
  }
}
