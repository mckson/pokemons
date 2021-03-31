import PokemonStat from './PokemonStat'

const PokemonStats = ({ stats }) => {
    const maxValue = Math.max(stats.map((stat) => (stat.base_stat)));
    return (
        <div className='stats'>
            {
                stats.map((stat) => (
                    <PokemonStat title={stat.stat.name} value={stat.base_stat} max={maxValue} />
                ))
            }
        </div>
    )
}

export default PokemonStats
