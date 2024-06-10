import React, { useEffect, useState } from 'react';
import ArticleItem from './ArticleItem';
import type Article from './types';
import { BallTriangle } from 'react-loader-spinner';

const url =
  'https://newsapi.org/v2/everything?q=кофе&language=ru&pageSize=20&apiKey=d40432c84cde4423bf6c94f3e4fcfafa';

export default function NewsArticles(): JSX.Element {
  // let articles: Article[] = [];
  const [articles, setArticles] = useState<Article[]>([]); // в клювиках я указываю какого типа будет переменная состояния

  const [search, setSearch] = useState<string>(''); // это переменная состояния для инпута
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      });
  }, []);

  // типизации этой функции скопирована, когда наводим на onSubmit в форме
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(`https://newsapi.org/v2/everything?q=${search}&language=ru&pageSize=20&apiKey=d40432c84cde4423bf6c94f3e4fcfafa
      `)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Введи ключевое слово для поиска новостей:
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <button type="submit">Найти</button>
      </form>
      {loading ? (
        <div className="flex justify-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        // 'Загрузка....'
        <>
          {articles.map((article, index) => (
            <ArticleItem article={article} key={index} />
          ))}
        </>
      )}
    </div>
  );
}
