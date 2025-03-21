import { STRAPI_URL } from "./constants";

export const transformNewsDataToCards = (newsList) => {
  if (!newsList || newsList.length < 1) return [];
  return newsList?.map(
    ({ documentId, title, description, date, img, categories }) => ({
      id: documentId,
      title: title,
      description: description?.[0]?.children?.[0]?.text,
      timestamp: new Date(date),
      img: img?.url ? STRAPI_URL + img?.url : null,
      tags: categories.map((category) =>
        category === "official" ? "Silvana Official" : category
      ),
    })
  );
};
