export interface IProductsFilesServiceBulkInsert{
    names: {
        name: string
    }[]
}
export interface IProductsFilesServiceFindByNames{
    fileNames: string[]
}