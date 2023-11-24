"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
let FilesService = class FilesService {
    async upload({ files }) {
        console.log(files);
        const waitedFiles = await Promise.all(files);
        console.log(waitedFiles);
        const bucketName = 'webportfolio-backend-storage';
        const storage = new storage_1.Storage({
            projectId: "mybackend-401718",
            keyFilename: "mybackend-401718-7c6822055359.json",
        }).bucket(bucketName);
        const result = await Promise.all(waitedFiles.map((el) => new Promise((res, rej) => {
            el.createReadStream()
                .pipe(storage.file(el.filename)
                .createWriteStream())
                .on("finish", () => {
                res(`${bucketName}/${el.filename}`);
            }).on("error", () => {
                rej("fail");
            });
        })));
        console.log("file was sent successfully");
        return result;
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map