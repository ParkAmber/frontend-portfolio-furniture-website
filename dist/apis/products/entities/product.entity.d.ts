import { ProductCategory } from "src/apis/productsCategories/entities/productCategory.entity";
import { ProductFile } from "src/apis/productsFiles/entities/productFile.entity";
import { ProductTag } from "src/apis/productsTags/entities/productTag.entity";
import { User } from "src/apis/users/entities/user.entity";
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    isSoldout: boolean;
    productCategory: ProductCategory;
    user: User;
    productTags: ProductTag[];
    files: ProductFile[];
    deletedAt: Date;
}
