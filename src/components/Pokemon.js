import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import PokemonTypes from './PokemonTypes';
import PokemonAbilities from './PokemonAbilities';
import PokemonStats from './PokemonStats';
import PokemonEvolution from './PokemonEvolution';

const Pokemon = ({ pokemon, species }) => {
    // constructor(props) {
    //     super(props);
    //     this.state = { 
    //         pokemon: props.pokemon,
    //         pokemonUrl: props.url,
    //         isLoaded: false
    //     };
    // }

    // componentDidMount() {
    //     // this.fetchPokemon(this.state.pokemonUrl, this.state.pokemonId);
    // }

    // fetchPokemon = async (url, id) => {
    //     const resultPokemon = await fetch(`${url}`);
    //     const pokemon = await resultPokemon.json();

    //     const resultPokemonSpecies = await fetch(pokemon.species.url);
    //     const pokemonSpecies = await resultPokemonSpecies.json();

    //     this.setState({
    //         isLoaded: true,
    //         pokemon: {
    //             id: pokemon.id,
    //             name: pokemon.name,
    //             image: pokemon.sprites.other['official-artwork'].front_default,
    //             types: pokemon.types,
    //             abilities: pokemon.abilities,
    //             height: pokemon.height,
    //             weight: pokemon.weight,
    //             species: pokemonSpecies.genera[7].genus,
    //             color: pokemonSpecies.color.name,
    //             stats: pokemon.stats
    //         }
    //     });
    // }



    
        if (!pokemon && !species) {
            return <div>No selected pokemon</div>
        }
        else{
            return (
                <div className='pokemon'>
                    <div className='pokemon pokedexData'>
                        <div className='pokemon pokedexData image'>
                            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                        </div>
                        <div className='pokemon pokedexData data'>
                            <h3>Pokedex Data</h3>
                            <div className='pokemon pokedexData data item'>
                                Types: <PokemonTypes types={pokemon.types} color={pokemon.color} />
                            </div>
                            <div className='pokemon pokedexData data item'>
                                National №: {(parseInt(pokemon.id / 100) > 0) ? pokemon.id : `0${pokemon.id}`}
                            </div>
                            <div className='pokemon pokedexData data item'>
                                Species: {species.genera[7].genus}
                            </div>
                            <div className='pokemon pokedexData data item'>
                                Height: {pokemon.height / 10} m
                            </div>
                            <div className='pokemon pokedexData data item'>
                                Weight: {pokemon.weight / 10} kg
                            </div>
                            <div className='pokemon pokedexData data item'>
                                Abilities: <PokemonAbilities abilities={pokemon.abilities} />
                            </div>
                        </div>
                    </div>
                    <div className='pokemon baseStats'>
                        <h4>Base stats</h4>
                        <PokemonStats stats={pokemon.stats} />
                    </div>
                    <PokemonEvolution />
                </div>
            );
        }
    
}

Pokemon.propTypes = {
    id: PropTypes.number
}

export default Pokemon
