import React, {useEffect, useState} from "react"
import Recipe from './Recipe';
import './App.css';


const App  = () => {
  // const APP_ID = "0ac1f7fe";
  // const APP_KEY = "6588cb9f87a1fc1b87039dbae5601501";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('avocado') ;

  useEffect(() => {
    getRecipes();
  }, [query]);

const getRecipes = async () => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data = await response.json();

    // TheMealDB returns "meals" instead of "hits"
    setRecipes(data.meals || []);

    console.log(data.meals);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
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
{recipes.map(recipe => (
  <div key={recipe.idMeal}>
    <h2>{recipe.strMeal}</h2>
    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
  </div>
))}
    </div>
    </div>
  );
};

export default App;
