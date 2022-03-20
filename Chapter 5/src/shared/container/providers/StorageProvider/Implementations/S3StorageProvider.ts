import { S3 } from "aws-sdk";
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';
import { IStorageProvider } from "../Interfaces/IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    console.log({
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_BUCKET: process.env.AWS_BUCKET,
      AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION
    });

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: "public-read",
      Body: fileContent,
      ContentType
    }).promise().catch((err) => console.log(err));

    await fs.promises.unlink(originalName);
    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
    }).promise();
  }


}

export { S3StorageProvider };