// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import { getAllArticles } from '@lib/articles';
import styles from '@styles/index.module.css';

const HomePage = ({ articles }) => (
  <div>
    <h1>My RSS Reader</h1>
    {articles.map((article) => (
      <article className={styles.article} key={article.slug}>
        <h2 dangerouslySetInnerHTML={{ __html: article.title }} />
        <div>
          <span>{article.feedTitle}</span>
          <span>{article.author}</span>
          <span>{article.pubDate}</span>
        </div>
        <a href={article.slug}>Read here</a>
        <a href={article.link}>Read source</a>
        <hr />
        <p dangerouslySetInnerHTML={{ __html: article.description }} />
      </article>
    ))}
  </div>
);

// Fetch all the articles in the feed once per day
// Read about revalidate here:
//   https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export async function getStaticProps() {
  const articles = await getAllArticles();

  return {
    props: {
      articles,
    },
    revalidate: 86400,
  };
}

export default HomePage;
