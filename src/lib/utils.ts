import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { Storage } from "@google-cloud/storage"
// import * as fs from "fs/promises"
// import path from "path"

// const storage = new Storage()
// const bucketName = "nature-finance-rag/rag-source"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export async function uploadFilesToBucketGCP(filePaths: string[]): Promise<void> {
//   console.log(`Starting upload to bucket: ${bucketName}`)
//   for (const filePath of filePaths) {
//     try {
//       const fileName = path.basename(filePath)
//       const destination = fileName
//       await storage.bucket(bucketName).upload(filePath, { destination })
//       console.log(`${filePath} uploaded to ${bucketName}/${destination}`)
//     } catch (error) {
//       console.error(`Error uploading file ${filePath}:`, error)
//       throw error // Re-throw the error to be handled by the caller
//     }
//   }
//   console.log("All files processed for upload.")
// }