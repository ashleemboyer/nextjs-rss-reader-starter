import { getAllArticles } from '@lib/articles';
import { Article, LoggedInContent } from '@components';

const ArticlePage = ({ article }) => (
  <LoggedInContent>
    <a href="/">Home</a>
    <Article article={article} />
  </LoggedInContent>
);

export async function getStaticPaths() {
  const articles = await getAllArticles();
  const paths = articles.map((article) => ({ params: { slug: article.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const articles = await getAllArticles();
  const article = articles.find((article) => article.slug === slug);

  return {
    props: {
      article,
    },
    revalidate: 86400,
  };
}

export default ArticlePage;
