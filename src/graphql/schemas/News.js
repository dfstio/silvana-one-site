import { gql } from "@apollo/client";
import { NEWS_ATTRIBUTES_FRAGMENT } from "./fragments/newsAttributes";

export const ALL_NEWS_QUERY = gql`
  ${NEWS_ATTRIBUTES_FRAGMENT}
  query NewsPage($pagination: PaginationArg, $sort: [String]) {
    newsPage(pagination: $pagination, sort: $sort) {
      ...newsAttributes
    }
  }
`;

export const PIECE_OF_NEWS_QUERY = gql`
  ${NEWS_ATTRIBUTES_FRAGMENT}
  query News($documentId: ID!) {
    news(documentId: $documentId) {
      ...newsAttributes
    }
  }
`;

export const CERTAIN_CATEGORY_NEWS_QUERY = gql`
  ${NEWS_ATTRIBUTES_FRAGMENT}
  query NewsPage(
    $filters: NewsFiltersInput
    $pagination: PaginationArg
    $sort: [String]
  ) {
    newsPage(filters: $filters, pagination: $pagination, sort: $sort) {
      ...newsAttributes
    }
  }
`;

export const HOME_HIGHLIGHTED_NEWS_QUERY = gql`
  query HomepageHighlights($sort: [String], $pagination: PaginationArg) {
    homepageHighlights(sort: $sort, pagination: $pagination) {
      documentId
      Link
      HomepageTitle
      HomepageDescription
      Pictogram {
        url
      }
      createdAt
      Priority
    }
  }
`;
