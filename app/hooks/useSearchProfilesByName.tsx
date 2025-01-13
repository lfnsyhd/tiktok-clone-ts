import { database, Query } from "@/libs/AppWriteClient";

const useSearchProfilesByName = async (name: string) => {
  try {
    const response = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      [
        Query.limit(5),
        Query.search("name", name)
      ]
    );

    const documents = response.documents;
    const objPromises = documents.map(document => {
      return {
        id: document?.id,
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

export default useSearchProfilesByName;