import Statbar from './Statbar'

const PokemonStat = ({ title, value, max }) => {
    const titleStyle = {
        gridArea: 'title',
    }
    const valueStyle = {
        gridArea: 'value',
    }
    const barStyle = {
        gridArea: 'bar',
    }
    return (
        <div className='pokemon stat'>
            <div style={titleStyle}>{title}</div>
            <div style={valueStyle}>{value}</div>
            <Statbar value={value} max={max} style={barStyle} />
        </div>
    )
}

export default PokemonStat
