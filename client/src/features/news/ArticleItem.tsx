import React from 'react';
import type Article from './types';
import { Link } from 'react-router-dom';

type ArticleItemProps = {
  article: Article;
};

export default function ArticleItem({ article }: ArticleItemProps): JSX.Element {
  const date = new Date(String(article.publishedAt));
  return (
    <div className="ml-[160px]">
      <h1 style={{ color: ' wheat' }}>
        <Link style={{ color: ' wheat' }} to={article.url}>{article.title}</Link>
      </h1>
      <i>{date.toLocaleDateString()}</i>
      <p>{article.description}</p>
      <div className="flex justify-center  ">
        <img className="w-[700px] " src={article.urlToImage} alt="alt" />
      </div>
    </div>
  );
}
