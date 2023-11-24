import { FilesService } from "./files.service";
import { FileUpload } from 'graphql-upload';
export declare class FilesResolver {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(files: FileUpload[]): Promise<string[]>;
}
