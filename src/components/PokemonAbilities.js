import PokemonAbility from './PokemonAbility'

const PokemonAbilities = ({ abilities }) => {
    return (
        <>
            {
                abilities.map((ability, index) => (
                    <PokemonAbility ability={ability} key={index} />
                )) 
            }
        </>
    )
}

export default PokemonAbilities
