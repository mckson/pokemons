import PokemonSpecies from './PokemonSpecies'
import React from 'react'

const PokemonsListToDisplay = ( {pokemonSpecies, onSelect} ) => {  
    return (
        pokemonSpecies.map((pokemon) => <PokemonSpecies key={pokemon.id} pokemon={pokemon} onSelect={onSelect} />)
    )
}

export default PokemonsListToDisplay
