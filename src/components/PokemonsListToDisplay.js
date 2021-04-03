import PokemonSpecies from './PokemonSpecies'
import React, { useCallback } from 'react'

const PokemonsListToDisplay = ( {pokemonSpecies, onSelect} ) => {
    // const [pokemonSpecies, setPokemonSpecies] = useState(pokemonSpecies);

    // const renderPokemonSpecies = useCallback((pokemon) => (
    const renderPokemonSpecies = (pokemon) => (
        <PokemonSpecies key={pokemon.id} pokemon={pokemon} onSelect={onSelect} />
    )

    
        return (
            pokemonSpecies.map((pokemon) => <PokemonSpecies key={pokemon.id} pokemon={pokemon} onSelect={onSelect} />)
        )
}

export default PokemonsListToDisplay
