// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import { getAllArticles } from '@lib/articles';

const HomePage = ({ articles }) => (
  <div>
    <h1>My RSS Reader</h1>
    {articles.map((article) => (
      <div>
        <h2>{article.title}</h2>
        <p>{article.feedTitle}</p>
        <p>{article.author}</p>
        <p>{article.pubDate}</p>
      </div>
    ))}
  </div>
);

// Fetch all the articles in the feed once per day
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
