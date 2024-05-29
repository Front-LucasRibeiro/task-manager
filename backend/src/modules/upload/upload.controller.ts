import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }
  
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: FileDTO[]) {

    return await this.uploadService.uploadFiles(files); 
  } 
}
