import { database, Query } from "@/libs/AppWriteClient";

const useGetRandomUsers = async () => {
  try {
    const response = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      [
        Query.limit(5)
      ]
    );

    const documents = response.documents;
    const objPromises = documents.map(document => {
      return {
        id: document?.user_id,
        name: document?.name,
        image: document?.image,
      }
    });
  
    const result = await Promise.all(objPromises);
    return result;
  } catch (error) {
    throw error;
  }
}

export default useGetRandomUsers;