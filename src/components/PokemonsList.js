import PropTypes from 'prop-types'

const PokemonsList = ({ text }) => {
    return (
        <h3>{text}</h3>
    )
}

PokemonsList.propTypes = {
    text: PropTypes.string
}

export default PokemonsList
