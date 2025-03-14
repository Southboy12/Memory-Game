import './App.css';
import Header from "./components/Header";
import Card from "./components/Card";
import { useEffect, useState } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [selectedCards, setSelectedCards] = useState([])


  function updateSelectedCard(id) {
    setSelectedCards((prevSelected) => [...prevSelected, id]);
  }

  function clear() {
    setScore(0)
    setSelectedCards([])
  }

  // Shuffle Array
  function shuffleArray(array) {
    const shuffleArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Get random index
      [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];  // Swap elements
    }
    return shuffleArray;
  }
  
 
  function getUniqueRandomNumbers(count, min, max) {
    const range = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    range.sort(() => Math.random() - 0.5); // Shuffle array
    return range.slice(0, count);
  }

  function updateScore() {
    setScore((prevScore) => prevScore + 1)
  }

  

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true)
      setError(null)

      try {
        const randomIds = getUniqueRandomNumbers(12, 1, 151);

        // Fetch all Pokémon in parallel
        const pokemonList = await Promise.all(
          randomIds.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return response.json();
          })
        );

        // Format the Pokémon data
        const formattedPokemons = pokemonList.map((pokemon) => ({
          id: pokemon.id.toString(),
          name: pokemon.name,
          image: pokemon.sprites.other["official-artwork"].front_default
        }));

        setPokemons(formattedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data", error);
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon();
  }, []);


useEffect(() => {
  const cardEls = document.querySelectorAll(".card");

  function handleClick(event) {
    const clickedId = event.currentTarget.id;

    if (selectedCards.includes(clickedId)) {
      setBestScore(bestScore >= score ? bestScore : score)
      clear()
      return;
    }
    
    updateSelectedCard(clickedId);    
    updateScore()
    setPokemons((prevPokemons) => shuffleArray(prevPokemons));
  }

  cardEls.forEach((cardEl) => {
    cardEl.addEventListener("click", handleClick)
  });

  return () => {
    cardEls.forEach((cardEl) => {
      cardEl.removeEventListener("click", handleClick)
    })
  }
}, [pokemons, selectedCards, bestScore, score]);




  return (
    <>
      <Header bestScore={bestScore} score={score} />
      <Card updateScore={updateScore} error={error} loading={loading} pokemons={pokemons} />
    </>
  );
}

export default App;
