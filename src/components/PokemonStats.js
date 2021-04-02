import PokemonStat from './PokemonStat'

const PokemonStats = ({ stats }) => {
    const maxValue = Math.max(stats.map((stat) => (stat.base_stat)));
    return (
        <div className='stats'>
            {
                stats.map((stat, index) => (
                    <PokemonStat title={stat.stat.name} value={stat.base_stat} max={maxValue} key={index} />
                ))
            }
        </div>
    )
}

export default PokemonStats
