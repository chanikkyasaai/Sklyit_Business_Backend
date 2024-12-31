import { 
  Controller, 
  Post, 
  Get, 
  Delete, 
  Res, 
  Query, 
  BadRequestException, 
  UseInterceptors, 
  UploadedFile 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureBlobService } from './imageBlob.service';
import { Response } from 'express';

@Controller('blob')
export class BlobController {
  private readonly containerName = 'upload-file'; // Replace with your container name

  constructor(private readonly azureBlobService: AzureBlobService) {}

  // Method to upload file to Azure Blob Storage
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, callback) => {
        // Check if the file type is one of the allowed formats
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('Only jpeg, png, and jpg files are allowed'), false);
        }
        callback(null, true); // Allow the file
      },
    }),
  ) // Ensure 'myfile' matches the key in your Postman request
  async upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log('Uploaded file:', file);
    if (!file) {
      throw new BadRequestException('No file was uploaded.');
    }

    try {
      const fileUploaded = await this.azureBlobService.upload(file, this.containerName);
      return fileUploaded;
    } catch (error) {
      console.error('Upload failed:', error);
      throw new BadRequestException('Failed to upload file');
    }
  }

  // Method to retrieve file from Azure Blob Storage
  @Get('read')
  async readFile(@Res() res: Response, @Query('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException('Filename is required');
    }

    try {
      const fileStream = await this.azureBlobService.getFile(filename, this.containerName);
      fileStream.pipe(res); // Pipe the file to the response
    } catch (error) {
      console.error('Failed to retrieve file:', error);
      throw new BadRequestException('Failed to retrieve file');
    }
  }

  // Method to delete file from Azure Blob Storage
  @Delete('delete')
  async deleteFile(@Query('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException('Filename is required');
    }

    try {
      await this.azureBlobService.deleteFile(filename, this.containerName);
      return { message: 'File deleted successfully' };
    } catch (error) {
      console.error('Failed to delete file:', error);
      throw new BadRequestException('Failed to delete file');
    }
  }
}
