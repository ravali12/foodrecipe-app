import React, {useEffect, useState} from "react"
import Recipe from './Recipe';
import './App.css';


const App  = () => {
  const APP_ID = "0ac1f7fe";
  const APP_KEY = "6588cb9f87a1fc1b87039dbae5601501";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('avacado') ;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch 
    (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search); 
    setSearch('');
  }
 
  return (
    <div className="App">
    <form onSubmit={getSearch} className = "search-form">
      <h2>No One is born a great cook, one learns by doing! </h2>
      <h3>Its time chefs! Its time to find the recipe you like! </h3>
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className = "search-button"type="submit">
          Find
        </button>
    </form>
    <div className="recipes">
    {recipes.map(recipe =>(
      <Recipe
      key={recipe.recipe.label}
      title = {recipe.recipe.label} 
      calories= {recipe.recipe.calories}
      image= {recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
       />
    ))}
    </div>
    </div>
  );
};

export default App;
