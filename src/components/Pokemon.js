import React from 'react'
import PropTypes from 'prop-types'
import PokemonTypes from './PokemonTypes';
import PokemonAbilities from './PokemonAbilities';
import PokemonStats from './PokemonStats';

class Pokemon extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            pokemon: null,
            pokemonId: props.id,
            pokemonUrl: props.url,
            isLoaded: false
        };
    }

    componentDidMount() {
        this.fetchPokemon(this.state.pokemonUrl, this.state.pokemonId);
    }

    fetchPokemon = async (url, id) => {
        const resultPokemon = await fetch(`${url}${id}`);
        const pokemon = await resultPokemon.json();

        const resultPokemonSpecies = await fetch(pokemon.species.url);
        const pokemonSpecies = await resultPokemonSpecies.json();

        this.setState({
            isLoaded: true,
            pokemon: {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other['official-artwork'].front_default,
                types: pokemon.types,
                abilities: pokemon.abilities,
                height: pokemon.height,
                weight: pokemon.weight,
                species: pokemonSpecies.genera[7].genus,
                color: pokemonSpecies.color.name,
                stats: pokemon.stats
            }
        });
    }

    render() {
        const { isLoaded, pokemon } = this.state;
        if (!isLoaded){
            return <div>Loading...</div>
        }
        else{
            return (
                <div className='pokemon'>
                    <div className='pokedexData'>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <div className='data'>
                            <h3>Pokedex Data</h3>
                            <p>National №: {(parseInt(pokemon.id / 100) > 0) ? pokemon.id : `0${pokemon.id}`}</p>
                            <p>Types: <PokemonTypes types={pokemon.types} color={pokemon.color} /></p>
                            <p>Species: {pokemon.species}</p>
                            <p>Height: {pokemon.height / 10} m</p>
                            <p>Weight: {pokemon.weight / 10} kg</p>
                            <p>Abilities: <PokemonAbilities abilities={pokemon.abilities} /></p>
                        </div>
                    </div>
                    <div className='baseStats'>
                        <h4>Base stats</h4>
                        <PokemonStats stats={pokemon.stats} />
                    </div>
                </div>
            );
        }
    }
}

Pokemon.propTypes = {
    id: PropTypes.number
}

export default Pokemon
