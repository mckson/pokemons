import PokemonAbility from './PokemonAbility'

const PokemonAbilities = ({ abilities }) => {
    return (
        <>
            {
                abilities.map((ability) => (
                    <PokemonAbility ability={ability} />
                )) 
            }
        </>
    )
}

export default PokemonAbilities
