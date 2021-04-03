import React from 'react'
import PokemonCard from './PokemonCard';

class PokemonSpecies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonSpecies: {},
            pokemon: {},
            isLoaded: false
        }
    }
    // const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [pokemonSpecies, setPokemonSpecies] = useState({});
    // const [pokemon, setPokemon] = useState({});

    // const fetchPokemon = async (url, id) => {
    //     const resultPokemon = await fetch(`${url}`);
    //     const pokemon = await resultPokemon.json()
    //     setPokemon({
    //         id: pokemon.id,
    //         name: pokemon.name,
    //         image: pokemon.sprites.other['official-artwork'].front_default,
    //         types: pokemon.types,
    //         abilities: pokemon.abilities,
    //         height: pokemon.height,
    //         weight: pokemon.weight,
    //         species: pokemonSpecies.genera[7].genus,
    //         color: pokemonSpecies.color.name,
    //         stats: pokemon.stats
    //     });
    // }
    componentDidMount() {
        // this.fetchPokemonSpecies(`${this.props.url}`)        
        this.setState({
            isLoaded: true
        })
    }

    fetchPokemonSpecies = async (url) => {
        const response = await fetch(`${url}`)  
        const result = await response.json()

        const responsePokemon = await fetch(`${result.varieties[0].pokemon.url}`)
        const resultPokemon = await responsePokemon.json()
        
        this.setState({
            pokemonSpecies: result,
            pokemon: resultPokemon,
            isLoaded: true
        })
    }

    fetchPokemon = async (url) => {
        const response = await fetch(`${url}`)
        const result = await response.json()
       
        return result;
    }

    renderPokemon = (pokemon) => (
            <PokemonCard pokemon={pokemon} />
        )

    render() {
        const { isLoaded, pokemon, pokemonSpecies } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <PokemonCard pokemon={this.props.pokemon} onSelect={this.props.onSelect} />
                // <PokemonCard pokemon={pokemon} species={pokemonSpecies} onSelect={this.props.onSelect} />
            )
        }
    }
}

export default PokemonSpecies
