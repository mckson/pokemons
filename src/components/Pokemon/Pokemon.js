import React from 'react';
import PropTypes from 'prop-types';
import PokemonTypes from '../PokemonTypes';
import PokemonAbilities from '../PokemonAbilities';
import PokemonStats from '../PokemonStats';
import PokemonEvolution from '../PokemonEvolution';

import './Pokemon.css'

const Pokemon = ({ pokemon }) => {   
    const toFeets = (meters) => {
        let inches = meters * 39.37;
        let feet = inches / 12;
        inches = (feet - parseInt(feet)) * 12;
        return { feet: parseInt(feet), inches: Math.round(inches) } 
    }


    if (!pokemon) {
        return <div>No selected pokemon</div>
    }
    else{
        return (
            <div className='pokemon'>
                <div className='pokemon pokedexData'>
                    <div className='pokemon pokedexData image'>
                        <img src={pokemon.image} alt={pokemon.name} />
                    </div>
                    <div className='pokemon pokedexData data'>
                        <h3>Pokedex Data</h3>
                        <div className='pokemon pokedexData data item'>
                            <span className='left'>National №: </span><span className='right bold'>{`${((pokemon.id/1000).toFixed(3)).toString().slice(2)}`}</span>
                        </div>
                        <div className='pokemon pokedexData data item'>
                            <span className='left'>Types: </span><PokemonTypes types={pokemon.types} color={pokemon.color} />
                        </div>
                        <div className='pokemon pokedexData data item'>
                            <span className='left'>Species: </span><span className='right'>{pokemon.species_name}</span>
                        </div>
                        <div className='pokemon pokedexData data item'>
                            <span className='left'>Height: </span> <span className='right'>{toFeets(pokemon.height / 10).feet}'{toFeets(pokemon.height / 10).inches}" ({pokemon.height / 10} m)</span>
                        </div>
                        <div className='pokemon pokedexData data item'>
                            <span className='left'>Weight: </span> <span className='right'>{Math.round(pokemon.weight * 2.205) / 10} lbs ({pokemon.weight / 10} kg)</span>
                        </div>
                        <div className='pokemon pokedexData data item'>
                            <span className='left'>Abilities: </span> <PokemonAbilities abilities={pokemon.abilities} />
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
