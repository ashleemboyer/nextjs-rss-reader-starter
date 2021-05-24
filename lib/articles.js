const fs = require('fs');

const RSS_TO_JSON = `https://api.rss2json.com/v1/api.json?api_key=${process.env.RSS_2_JSON_API_KEY}&rss_url=`;

const fetchFeedByUrl = async (url) => {
  return await fetch(RSS_TO_JSON + url).then((response) => response.json());
};

export const getAllArticles = async () => {
  const articles = [];

  const feedUrls = fs.readFileSync('feed.txt', 'utf8').split('\n');
  for (let feedUrl of feedUrls) {
    const feed = await fetchFeedByUrl(feedUrl);
    if (!feed.items || feed.status !== 'ok') {
      return;
    }

    feed.items.forEach((item) => {
      articles.push({ ...item, feedTitle: feed.feed.title });
    });
  }

  // Sort all articles newest to oldest
  articles.sort((a, b) => {
    const dateA = a.pubDate;
    const dateB = b.pubDate;

    if (dateA < dateB) {
      return 1;
    }

    return -1;
  });

  return articles;
};
