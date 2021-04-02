import PokemonSpecies from './PokemonSpecies'
import React, { useCallback } from 'react'

const PokemonsListToDisplay = ( {pokemonSpecies, onSelect} ) => {
    // const [pokemonSpecies, setPokemonSpecies] = useState(pokemonSpecies);

    const renderPokemonSpecies = useCallback((pokemon) => (
        <PokemonSpecies key={pokemon.pokemon_species.name} name={pokemon.pokemon_species.name} url={pokemon.pokemon_species.url} onSelect={onSelect} />
    ), []);

        return (
            pokemonSpecies.map((pokemon) => renderPokemonSpecies(pokemon))
        )
}

export default PokemonsListToDisplay
