import React from "react";
import style from "./NewsPage.module.sass";
import Loader from "react-loader-spinner";
import useNewsPage from "../../hooks/useNewsPage";
import {
  PageHeader,
  useMedia,
  NewsCardNew,
  TileTable,
  useScrollToTop,
} from "@staketab/lib";
import { NEWS_COLORS } from "../../utils/constants";
import { transformNewsDataToCards } from "../../utils/transformNewsDataToCards";

const tableLimits = [
  { text: "10", value: 10 },
  { text: "20", value: 20 },
  { text: "50", value: 50 },
];

const NewsPage = () => {
  const {
    newsList,
    newsLoading,
    page,
    setPage,
    limit,
    setLimit,
  } = useNewsPage();

  const [element, scrollToTop] = useScrollToTop();

  const {
    greater: {xs: xsScreen },
  } = useMedia();

  return (
    <div className={style.newsPage} ref={element}>
      <div className="container">
        <PageHeader
          title="Silvana Blog"
          globalClassNames="globalPageHeaderWrapper"
        />
        {newsLoading ? (
          <Loader
            type="Oval"
            color="var(--text-active-color-3)"
            height={27}
            width={27}
            style={{ textAlign: "center", paddingTop: "20px" }}
          />
        ) : (
          <TileTable
            view="bigTiles"
            component={
              <NewsCardNew
                tagColors={NEWS_COLORS}
                className={style.card}
                redirectWithNoPrefix
              />
            }
            data={transformNewsDataToCards(newsList)}
            currentPage={page}
            pageLimit={limit}
            totalElements={newsList?.length}
            onPageChange={(data) => {
              setPage(data);
              scrollToTop();
            }}
            onLimitChange={(data) => {
              setLimit(data);
              setPage(0);
              scrollToTop();
            }}
            limitOptions={tableLimits}
            className={style.tileTable}
            customBigCardWidth={xsScreen ? "413px" : "250px"}
            tableItemClassName={style.cardWrapper}
            paginationCustomClassName={style.pagination}
            customGap={40}
            noTopPagination
          />
        )}
      </div>
    </div>
  );
};

export default NewsPage;
