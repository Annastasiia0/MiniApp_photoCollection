import React, { useEffect, useState } from 'react';
import {Collection} from './Collection';
import './index.scss';

const cats = [
  
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }

]

function App() {
  const [categoryId, setCategoryId]= useState(0)
  const [isLoading, setISLoading]= useState(true)
  const [collections, setCollections]=useState([]);
  const [searchValue, setSearchValue]=useState(' ');
  const [page, setPage]= useState(1)


useEffect(()=>{
  setISLoading(true);
  const category = categoryId ? `category=${categoryId}`: ''

  fetch(`https://6340567dd1fcddf69cb6e217.mockapi.io/photocollection?page=${page}&limit=3&${category}`)
.then((res)=> res.json())
.then((json)=> {
  setCollections(json);
})
.catch((err)=> {
  console.warn(err);
  alert('Ошибка при получении данных');
}).finally(()=> setISLoading(false));
}, [categoryId, page]);



  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
         {
          cats.map((obj, i)=>(
          <li  
          onClick ={()=> setCategoryId(i)} 
          className={categoryId === i ? "active" : ' '} 
          key={obj.name}>
            {obj.name}
            </li>
          ))}
        </ul>
        <input searchValue={searchValue} onChange={e=> setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
         isLoading ? ( <h2>Идет загрузка...</h2>
         ):(
          collections
          .filter(obj=> obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj)=> <Collection
          key={obj.id}
          name={obj.name}
          images={obj.photos}
        />)
        )}
      </div>
      <ul className="pagination">
       {
        [...Array(5)].map((_, i)=>(
        <li 
        onClick={()=> setPage(i+1)}
        className={page === i+1 ? 'active' : ' '}>
          {i+1}
          </li>))
       }
      </ul>
    </div>
  );
}

export default App;
