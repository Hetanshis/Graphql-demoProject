import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();

async function uploadFile(bucketName: any, file: any, fileOutputName: any) {
  try {
    const projectId = process.env.PROJECT_ID;
    const keyFilename = process.env.KEYFILENAME;
    const storage = new Storage({ projectId, keyFilename });

    const bucket = storage.bucket(bucketName);
    const ret = await bucket.upload(file, {
      destination: fileOutputName,
    });

    return ret;
  } catch (error) {
    console.log(error);
  }
}
async () => {
  const ret = uploadFile(process.env.BUCKET_NAME, "test.txt", "coding.txt");
  console.log(ret)
};
