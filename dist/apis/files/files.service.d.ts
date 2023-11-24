import { FileUpload } from 'graphql-upload';
interface IFilesServiceUpload {
    files: FileUpload[];
}
export declare class FilesService {
    upload({ files }: IFilesServiceUpload): Promise<string[]>;
}
export {};
