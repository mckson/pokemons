import PokemonsList from './components/PokemonsList'
import Pokemon from './components/Pokemon'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemon: null,
      pokemons: [],
      url: 'https://pokeapi.co/api/v2/pokedex/1',
      isLoaded: false,
      quantity: 0
    }
  }

  componentDidMount() {
    this.fetchPokemons(`${this.state.url}`);
  }

  fetchPokemons = async (url) => {
    const response = await fetch(`${url}`);
    const pokedex = await response.json();

    this.setState({
      isLoaded: true,
      pokemons: pokedex.pokemon_entries,
      quantity: pokedex.pokemon_entries.lenght 
    });
  }

  onSelected = (e) => {
    this.setState({
      selectedPokemon: e
    })
  }


  render() {
    if (!this.state.isLoaded){
        return <div>Loading...</div>
    }
    else{
      return (
        <div className="App">
          <h1>Pokemons App</h1>
          <Pokemon pokemon={this.state.selectedPokemon} />
          <PokemonsList limit={15} pokemons={this.state.pokemons} onSelect={this.onSelected} />
        </div>
      );
    }
  }
}


export default App;
