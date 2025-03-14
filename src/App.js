import React from 'react';
import { Collection } from './Collection';
import './index.scss';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';
    const pageParam =`page=${page}`;

    fetch(`https://67d43ce4d2c7857431ecf813.mockapi.io/v1/photoCollections?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollections(json);
    })
    .catch(err => {
      console.warn(err);
      alert('ошибка при получении');
    }).finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => (
            <li
            onClick={() => setCategoryId(i)}
            className={categoryId === i ? 'active' : ''} key = {obj.name}>{obj.name}</li>
          ))}
        </ul>
        <input value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>идет загрузка...</h2>
        ) : (
          collections  
        .filter((obj) => {
          return obj.name.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((obj, index) => (
          <Collection
          key={index}
          name={obj.name}
          images={obj.photos}
        />
        ))
        )}
        
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, i) => (
          <li className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
