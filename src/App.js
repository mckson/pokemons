import PokemonsList from './components/PokemonsList/PokemonsList'
import Pokemon from './components/Pokemon/Pokemon'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPokemon: null,
      selectedSpecies: null,
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

    // console.log(Object.keys(pokedex.pokemon_entries).length); 

    this.setState({
      isLoaded: true,
      pokemons: pokedex.pokemon_entries,
      quantity: Object.keys(pokedex.pokemon_entries).length
    });
  }

  onSelected = (pokemon, species) => {
    this.setState({
      selectedPokemon: pokemon,
      selectedSpecies: species
    })
  }

  render() {
    if (!this.state.isLoaded){
        return <div>Loading...</div>
    }
    else {
      return (
        <div className="App">
          <h1>Pokemons App</h1>
          <Pokemon pokemon={this.state.selectedPokemon} species={this.state.selectedSpecies} />
          <PokemonsList limit={15} pokemons={this.state.pokemons} lenght={this.state.quantity} onSelect={this.onSelected} />
        </div>
      );
    }
  }
}


export default App;
