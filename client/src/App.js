import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import DrinkSuggestion from './components/DrinkSuggestion';
import SearchInfo from './components/SearchInfo';
import Nav from './components/Nav';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  const [suggestedDrinks, setSuggestedDrinks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [drinks, setDrinks] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  // 'options' provided by api
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a35a002151msh41ddaae5f070447p1e6af5jsn72373cb3b420',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
    }
  };

  const getSuggestedDrinks = async () => {
    let req = await fetch('https://the-cocktail-db.p.rapidapi.com/random.php', options)
    let res = await req.json()
    setSuggestedDrinks(res.drinks)
  }

  // searches ingredients for SearchInfo.jsx
  const searchIngredients = async () => {
    let req = await fetch(`https://the-cocktail-db.p.rapidapi.com/search.php?i=${searchTerm}`, options)
    let res = await req.json()
    // if statement stops the error when search is invalid
    if (res.ingredients !== null) {
      setIngredients(res.ingredients)
    }

  }

  // searches drink recipes for Search.jsx
  const searchDrinks = async () => {
    let req = await fetch(`https://the-cocktail-db.p.rapidapi.com/search.php?s=${searchTerm}`, options)
    let res = await req.json()
    // if statement stops the error when search is invalid
    if (res.drinks !== null) {
      setDrinks(res.drinks)
    }
  }

  // this fetches the user from the cookies if the page refreshes, so that the user stays logged in
  const fetchSession = async () => {
    let req = await fetch('/me')
    let res = await req.json()
    setCurrentUser(res)
  }



  useEffect(() => {
    getSuggestedDrinks();
    searchIngredients();
    searchDrinks();
    fetchSession();
  }, [searchTerm])

  // Nav needs to be inside BrowserRouter but outside Routes because...
  return (
    <div className="App">
      <BrowserRouter>

        <Nav
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <Routes>
          <Route exact path='/'
            element={<Home />} ></Route>

          <Route path='/drinks'
            element={<DrinkSuggestion
              suggestedDrinks={suggestedDrinks} />} ></Route>

          <Route path='/searchinfo'
            element={<SearchInfo
              ingredients={ingredients}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />} ></Route>

          <Route path='/search'
            element={<Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              drinks={drinks}
            />} ></Route>

          <Route path='/login'
            element={<Login
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />} ></Route>

          <Route path='/favorites'
            element={<Favorites />} ></Route>

          <Route path='/register'
            element={<Register />} ></Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
