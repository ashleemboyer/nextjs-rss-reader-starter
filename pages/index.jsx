// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

import { getAllArticles } from '@lib/articles';
import { signOut } from '@lib/firebase';
import { Article, LoggedInContent } from '@components';

const HomePage = ({ articles }) => (
  <LoggedInContent>
    <header>
      <h1>My RSS Reader</h1>
      <button
        onClick={() => {
          signOut().catch((err) => {
            alert(err);
          });
        }}
      >
        Sign Out
      </button>
    </header>
    {articles.map((article) => (
      <Article key={article.slug} article={article} forHomePage />
    ))}
  </LoggedInContent>
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
