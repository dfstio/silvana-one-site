import { useState, useEffect } from "react";
import { ALL_NEWS_QUERY } from "../graphql/schemas/News";
import { useFlexibleQuery } from "@staketab/lib";

const useNewsPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);

  const {
    loading: newsLoading,
    data: newsList = [],
  } = useFlexibleQuery(ALL_NEWS_QUERY, {
    page: page + 1,
    pageSize: limit,
    sort: "createdAt:desc",
  });

  useEffect(() => {
    setPage(0);
  }, [limit]);

  return {
    newsList: newsList?.newsPage?.filter(
      ({ title }) =>
        title ===
        "Beyond Traditional Verification: How Silvana Solves Data Privacy Challenges"
    ),
    newsLoading,
    page,
    setPage,
    limit,
    setLimit,
  };
};

export default useNewsPage;
