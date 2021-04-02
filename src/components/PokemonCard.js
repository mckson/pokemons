import { useState } from 'react'
import PokemonTypes from './PokemonTypes'

const PokemonCard = (props) => {
    const [pokemon, setPokemon] = useState({
        id: props.pokemon.id,
        name: props.pokemon.name,
        image: props.pokemon.sprites.other['official-artwork'].front_default,
        types: props.pokemon.types
    })

    return (
        <div className='pokemonCard' onClick={() => {props.onSelect(props.pokemon)}}>
            {
                pokemon.image ?
                <div className='pokemonCard image'><img src={pokemon.image} alt={pokemon.name} /></div> :
                <div className='pokemonCard image'>No image</div>
            }
            <div className='pokemonCard info'>
                <div className='pokemonCard info id'>{`#${((pokemon.id/1000).toFixed(3)).toString().slice(2)}`}</div>
                <div className='pokemonCard info name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
                <div className='pokemonCard info types'>
                    <PokemonTypes types={pokemon.types} />
                </div>
            </div>
        </div>
    )
}

export default PokemonCard
