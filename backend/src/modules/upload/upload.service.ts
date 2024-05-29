import { Injectable } from '@nestjs/common';
import { FileDTO } from './upload.dto';
import { writeFile } from 'fs/promises'; 

@Injectable()
export class UploadService {

  async uploadFiles(files: FileDTO[]): Promise<string[]> {
    const uploadResults: string[] = [];

    for (const file of files) {
      const filePath = `uploads/${file.originalname}`;

      try {
        await writeFile(filePath, file.buffer);
        uploadResults.push(file.originalname);
      } catch (error) {
        uploadResults.push(`Erro ao fazer upload do arquivo ${file.originalname}: ${error.message}`);
      }
    }

    return uploadResults;
  }
}
