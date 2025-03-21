import { useParams } from "react-router-dom";
import {
  PIECE_OF_NEWS_QUERY,
} from "../graphql/schemas/News";
import { useFlexibleQuery } from "@staketab/lib";
import { STRAPI_URL } from "../utils/constants";

const useNewsPage = () => {
  const { id } = useParams();

  const {
    loading,
    error,
    data: newsDetails = {},
  } = useFlexibleQuery(PIECE_OF_NEWS_QUERY, {
    documentId: id,
  });

  const img = STRAPI_URL + newsDetails?.news?.img?.url;

  const links = {
    twitter: newsDetails?.news?.twitter_url,
    reddit: newsDetails?.news?.reddit_url,
    mirror: newsDetails?.news?.mirror_url,
    link: newsDetails?.news?.custom_url,
  };
  
  return {
    newsDetails,
    img,
    links,
    loading,
  };
};

export default useNewsPage;
