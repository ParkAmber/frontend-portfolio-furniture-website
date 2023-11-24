import { Injectable } from "@nestjs/common";
import { Storage } from '@google-cloud/storage'
import { FileUpload } from 'graphql-upload'

interface IFilesServiceUploadMultiple{
  files: FileUpload[]
}

interface IFilesServiceUploadOne{
  file: FileUpload
}
@Injectable()
export class FilesService {
  async uploadMultiple({ files }: IFilesServiceUploadMultiple): Promise<string[]> {
    console.log(files);

    const waitedFiles = await Promise.all(files)

    console.log(waitedFiles); //[File, File]

    //1. 파일을 cloud storage에 저장하기!

    //1-1) storage 세팅하기
    const bucketName = 'webportfolio-backend-storage'
    const storage = new Storage(
      {
        projectId: "mybackend-401718",
        keyFilename: "mybackend-401718-7c6822055359.json",
      }
    ).bucket(bucketName);
    
    //1-2)storage에 파일 올리기
  
    // console.time("start!")
   const result = await Promise.all(
     waitedFiles.map(
       (el) => new Promise<string>((res, rej) => {
        el.createReadStream()
        // .pipe(storage.file("mypicture")
        .pipe(storage.file(el.filename)
          .createWriteStream())
        .on("finish", () => {
          res(`${bucketName}/${el.filename}`)
        }
        ).on("error", () => {
          rej("fail")
        });
      })
      )
    )

   
    // console.timeEnd("End!")
    console.log("file was sent successfully")

    return result //["imageurl-1", "imageurl-2"]
  }

  uploadOne({ file }: IFilesServiceUploadOne): string {
    console.log(file);
    console.log(file.filename);

    //1. 파일을 cloud storage에 저장하기!

    //1-1) storage 세팅하기
    const storage = new Storage(
      {
        projectId: "mybackend-401718",
        keyFilename: "mybackend-401718-7c6822055359.json",
      }
    ).bucket('webportfolio-backend-storage');
    
    //1-2)storage에 파일 올리기
    file.createReadStream()
      // .pipe(storage.file("mypicture")
      .pipe(storage.file(file.filename)
        .createWriteStream())
      .on("finish", () => {
        console.log("success")
      }
      ).on("error", () => {
        console.log("fail")
      });
    console.log("file was sent successfully")

    return file.filename
  }
}
