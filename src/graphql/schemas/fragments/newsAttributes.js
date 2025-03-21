import { gql } from "@apollo/client";

export const NEWS_ATTRIBUTES_FRAGMENT = gql`
  fragment newsAttributes on News {
    Article
    UID
    documentId
    categories
    category
    custom_url
    date
    description
    img {
      url
    }
    mirror_url
    reddit_url
    title
    twitter_url
  }
`;