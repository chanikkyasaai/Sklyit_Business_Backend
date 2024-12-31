// Import necessary modules and dependencies
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import { v4 as uuid } from "uuid";

@Injectable()
export class AzureBlobService {
  private containerName: string;
  private azureConnection: string;

  constructor(private readonly configService: ConfigService) {
    this.azureConnection = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
  }

  // Method to get a BlockBlobClient for a specific file
  private getBlobClient(imageName: string, containerName: string): BlockBlobClient {
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(this.azureConnection);
      const containerClient = blobServiceClient.getContainerClient(containerName);
      return containerClient.getBlockBlobClient(imageName);
    } catch (error) {
      console.error('Error creating Blob Client:', error);
      throw new Error('Failed to create Blob Client');
    }
  }

  // Method to upload a file to Azure Blob Storage
  async upload(file: Express.Multer.File, containerName: string): Promise<string> {
    try {
      if (!file) {
        throw new Error('File is required');
      }

      const fileName = uuid() + file.originalname;
      const blobClient = this.getBlobClient(fileName, containerName);
      await blobClient.uploadData(file.buffer); // Upload file data

      console.log(`File uploaded successfully: ${fileName}`);
      return fileName; // Return the unique file name
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  // Method to read a file from Azure Blob Storage
  async getFile(fileName: string, containerName: string): Promise<NodeJS.ReadableStream> {
    try {
      const blobClient = this.getBlobClient(fileName, containerName);
      const downloadResponse = await blobClient.download();

      if (!downloadResponse.readableStreamBody) {
        throw new Error('Failed to retrieve file stream');
      }

      return downloadResponse.readableStreamBody; // Return readable stream of file data
    } catch (error) {
      console.error('Error retrieving file:', error);
      throw new Error('Failed to retrieve file');
    }
  }

  // Method to delete a file from Azure Blob Storage
  async deleteFile(fileName: string, containerName: string): Promise<void> {
    try {
      const blobClient = this.getBlobClient(fileName, containerName);
      const deleteResponse = await blobClient.deleteIfExists();

      if (deleteResponse.succeeded) {
        console.log(`File deleted successfully: ${fileName}`);
      } else {
        console.warn(`File not found or already deleted: ${fileName}`);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }
}
