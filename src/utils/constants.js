import { ArticleTag } from "@staketab/lib";

export const STRAPI_URL = "https://admin.silvascan.io";

export const NEWS_COLORS = {
  news: ArticleTag.colors.purple,
  "project-spotlight": ArticleTag.colors.cyan,
  "release-notes": ArticleTag.colors.green,
  ecosystem: ArticleTag.colors.cyan,
  partners: ArticleTag.colors.yellow,
  analytics: ArticleTag.colors.pink,
};

export const smallTableLimitOptions = [
  { text: "10", value: 10 },
  { text: "20", value: 20 },
  { text: "50", value: 50 },
];

export const bigTableLimitOptions = [
  { text: "50", value: 50 },
  { text: "100", value: 100 },
  { text: "200", value: 200 },
];

export const ERROR_TABLE_TEXT = "No data available";
