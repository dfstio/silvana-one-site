import {useHistory} from 'react-router-dom'
import { NewsDetailsPageLayout } from "@staketab/lib";
import useNewsDetailsPage from "../../hooks/useNewsDetailsPage";
import { NEWS_COLORS } from "../../utils/constants";

const NewsDetailsPage = () => {
  const { newsDetails, img, links, loading } =
    useNewsDetailsPage();

	const history = useHistory();

  const pieceOfNews = newsDetails?.news;

  return (
    <NewsDetailsPageLayout
      img={img}
      tagColors={NEWS_COLORS}
      title={pieceOfNews?.title ?? ""}
      description={pieceOfNews?.description?.[0]?.children?.[0]?.text ?? ""}
      timestamp={pieceOfNews?.date ?? ""}
      tags={pieceOfNews?.categories ?? []}
      links={links}
      article={pieceOfNews?.Article ?? ""}
      loading={loading}
      handleBackButton={() => history.push(`/newshub`)}
    />
  );
};

export default NewsDetailsPage;
