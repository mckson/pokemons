import React from 'react'
import PokemonTypes from './PokemonTypes'

const types = [
    'all',
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock', 
    'bug', 
    'ghost', 
    'steel', 
    'fire', 
    'water', 
    'grass', 
    'electric', 
    'psychic', 
    'ice', 
    'dragon',
    'dark',
    'fairy', 
    'unknown', 
    'shadow'
]

const Navbar = ({onNext, onPrevious, onSelectType}) => {
    return (
        <div className='navbar'>
            <div className='navbar buttons'>
                <button className='flex=item' onClick={() => onPrevious()}>Previous</button>
                <button className='flex-item' onClick={() => onNext()}>Next</button>
            </div>
            <div className='navbar menu flex-item'>
                {types.map((value) => (
                    <div className='navbar menu types' onClick={() => {onSelectType(value)}}>{value}</div>
                ))}
            </div>
        </div>
    )
}

export default Navbar
