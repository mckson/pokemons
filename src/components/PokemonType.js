const PokemonType = ({ type }) => {
    return (
        <div className={`type ${type.name}`}>
            {type.name.toUpperCase()}
        </div>
    )
}

export default PokemonType
