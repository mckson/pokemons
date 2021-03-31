import PokemonsList from './components/PokemonsList'
import Pokemon from './components/Pokemon'

function App() {
  return (
    <div className="App">
      <h1>Pokemons App</h1>
      <PokemonsList text='pokemons list' />
      <Pokemon url='https://pokeapi.co/api/v2/pokemon/' id={701} />
    </div>
  );
}

export default App;
