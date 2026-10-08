const BLOB_URL = import.meta.env.VITE_BLOB_URL;

export const getImageUrl = (
  type: string,
  imageName: string
) => {
  console.log("BLOB_URL:", `${BLOB_URL}/${type}/${imageName}`);
  return `${BLOB_URL}/${type}/${imageName}`;
};