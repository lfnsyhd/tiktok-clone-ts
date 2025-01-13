import { storage } from "@/libs/AppWriteClient";

const userCreateBucketUrl = (fileId: string) => {
  const url = String(process.env.NEXT_PUBLIC_APPWRITE_URL);
  const id = String(process.env.NEXT_PUBLIC_BUCKET_ID);
  const endpoint = String(process.env.NEXT_PUBLIC_ENDPOINT);

  if(!url || !id || !endpoint || !fileId) return '';

  return `${url}/storage/buckets/${id}/files/${fileId}/view?project=${endpoint}`;
}

export default userCreateBucketUrl;