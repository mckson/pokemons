const PokemonAbility = ({ ability }) => {
    return (
        <div className='ability'>
            {ability.slot} {ability.ability.name} {ability.is_hidden && '(Hidden)'}
        </div>
    )
}

export default PokemonAbility
