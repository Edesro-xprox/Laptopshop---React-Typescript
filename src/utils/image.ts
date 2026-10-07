const BLOB_URL = import.meta.env.VITE_BLOB_URL;

export const getImageUrl = (
  type: string,
  imageName: string
) => {
  return `${BLOB_URL}/${type}/${imageName}`;
};