import PokemonType from './PokemonType'

const PokemonTypes = ({ types }) => {
    return (
        <>
            {
                types.map((type) => (
                    <PokemonType type={type.type} slot={type.slot} key={type.slot} />
                ))
            }
        </>
    )
}

export default PokemonTypes
