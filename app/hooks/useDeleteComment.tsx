import { database } from "@/libs/AppWriteClient";

const useDeleteComment = async (id: string) => {
  let videoId = Math.random().toString(36).slice(2, 22);
  
  try {
    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
      id
    );
  } catch (error) {
    throw error;
  }
}

export default useDeleteComment;