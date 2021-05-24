import styles from './Article.module.css';

const Article = ({ article, forHomePage }) => {
  let className = styles.article;
  if (forHomePage) {
    className += ' ' + styles.forHomePage;
  }

  let prettyPubDate;
  if (article.pubDate) {
    prettyPubDate = new Date(article.pubDate).toLocaleString();
  }

  return (
    <article className={className}>
      <h2 dangerouslySetInnerHTML={{ __html: article.title }} />
      <div>
        {article.feedTitle && <span>From: {article.feedTitle}</span>}
        {article.author && <span>By: {article.author}</span>}
        {prettyPubDate && <span>On: {prettyPubDate}</span>}
      </div>
      {forHomePage && <a href={article.slug}>Read here</a>}
      <a href={article.link}>Read at source</a>
      <hr />
      {forHomePage ? (
        <div dangerouslySetInnerHTML={{ __html: article.description }} />
      ) : (
        <main
          dangerouslySetInnerHTML={{
            __html: article.content || article.description,
          }}
        />
      )}
    </article>
  );
};

export default Article;
