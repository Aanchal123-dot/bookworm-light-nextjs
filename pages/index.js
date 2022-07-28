import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getAllPage, getListPage, getSinglePages } from "@lib/contents";
import { sortByDate } from "@lib/utils/sort";
import Posts from "@partials/Posts";

const Home = ({ post, authorData }) => {
  const sortPostByDate = sortByDate(post);
  const showPost = 4;
  const { title } = config.site;
  return (
    <Base title={title}>
      <div className="section">
        <div className="container max-w-[1000px]">
          <Posts
            post={sortPostByDate.slice(0, showPost)}
            authorData={authorData}
          />
        </div>
      </div>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content");
  const { frontmatter } = homepage;
  const { banner } = frontmatter;
  const allPost = getSinglePages("content/posts");

  const authorData = getAllPage("content/authors");

  return {
    props: {
      banner: banner,
      post: allPost,
      authorData: authorData,
    },
  };
};
