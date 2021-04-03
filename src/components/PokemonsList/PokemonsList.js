import React from 'react';
import PokemonsListToDisplay from '../PokemonsListToDisplay'
import Navbar from '../Navbar'

class PokemonsList extends React.Component {
    //pokemons - array from Pokedex (https://pokeapi.co/api/v2/pokedex/1) which contains objects of type { name, url }
    //limit - number of pokemons should be displayed 'per page'
    constructor(props) {         
        super(props);
        this.state = {
            //offset over filterdPokemonBuffer
            offset: 0,
            //offset over ALL pokemons from props
            filterOffset: 0,
            //array of pokemons 
            pokemonsToDisplay: [],
            //default filter which contains objects of type { name, url } that will be passed down to child components
            filter: 'all',
            //flag shows could we render pokemon list or it is no 'calculated' yet
            isLoaded: false,       
            //array to cache filtered pokemons for correct navigation (next, previous)     
            filteredPokemonsBuffer: []  
        }
    }

    async componentDidMount() {
        await this.renderPokemons();
        this.setState({
            isLoaded: true,
            pokemonsToDisplay: this.state.filteredPokemonsBuffer.slice(this.state.offset, this.state.offset + this.props.limit)
        })
    }

    //method required for changing pokemonsToDisplay state
    renderPokemons = async () => {
        await this.setState({
            isLoaded: false
        })

        //case when methos invoked in componentDidMount()
        if (this.state.filteredPokemonsBuffer.length === 0) {
            await this.fetchPokemonSpecies(this.props.pokemons, this.state.offset, this.props.limit, this.state.filter, this.props.lenght);
        }

        //making steps over array of 'cached' pokemons
        await this.setState({
            pokemonsToDisplay: this.state.filteredPokemonsBuffer.slice(this.state.offset, this.state.offset + this.props.limit  ),
            isLoaded: true
        })
    }    

    fetchPokemonSpecies = async (pokemons, offset, limit, filter, lenght) => {
        let pokemonBuffer = []      //buffer array for fetching portion of pokemons
        let newOffset = offset      //variable for defining next offset over pokemons list from PROPS
        let j = 0;

        for (let i = 0; j < limit && i + offset < lenght - 1; ++i) {
            try {
                const responseSpecies = await fetch(`${pokemons[offset + i].pokemon_species.url}`)
                const resultSpecies = await responseSpecies.json()

                let responsePokemon;
                let resultPokemon;

                try {
                    responsePokemon = await fetch(`${resultSpecies.varieties[0].pokemon.url}`)
                    resultPokemon = await responsePokemon.json()

                    for (const type of resultPokemon.types) {
                        if (filter === 'all' || type.type.name === filter) {
                            ++j;
                            
                            newOffset = i + offset;

                            pokemonBuffer.push(this.toFullPokemon(resultSpecies, resultPokemon));
                            break;
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                    continue;
                }
            }
            catch (e) {
                console.log(e);
                continue;
            }
        }

        //concatination of previous array of 'cached' pokemons and this new portion
        await this.setState({
            filteredPokemonsBuffer: this.state.filteredPokemonsBuffer.concat(pokemonBuffer),
            filterOffset: newOffset + 1
        })
    }

    onNextClick = async () => {
        const pokemonsLength = Object.keys(this.props.pokemons).length;

        if (this.state.filterOffset + this.props.limit + 1 < pokemonsLength) {
            await this.setState({
                offset: this.state.offset + this.props.limit
            });

            //when there is offset greater that size of filtered ('cached') elements we fetch next portion of data
            if (this.state.offset >= Object.keys(this.state.filteredPokemonsBuffer).length) {
               await this.fetchPokemonSpecies(this.props.pokemons, this.state.filterOffset, this.props.limit, this.state.filter, this.props.lenght);
            }
            console.log('next cliked');

            this.renderPokemons();
        }
    }
    
    onPreviousClick = async () => {
        if (this.state.offset > 0) {
            await this.setState({
                offset: this.state.offset - this.props.limit
            });
            console.log('previous cliked');
        
            this.renderPokemons();
        }
    }

    onSelectType = async (e) => {
        await this.setState({
            filter: e,
            offset: 0,
            filteredPokemonsBuffer: [],
            filterOffset: 0
        });
        this.renderPokemons();
    }

    //function that combines pokemonSpecies and pokemon into one object with all necessary properties
    toFullPokemon(pokemonSpecies, pokemon) {
        return {
            id: pokemonSpecies.id,
            name: pokemonSpecies.name,
            evolution_chain_url: pokemonSpecies.evolution_chain.url,
            evolves_from_species_url: pokemonSpecies.evolves_from_species?.url,
            image: pokemon.sprites.other['official-artwork'].front_default,
            types: pokemon.types,
            abilities: pokemon.abilities,
            height: pokemon.height,
            weight: pokemon.weight,
            species_name: pokemonSpecies.genera[7].genus,
            color: pokemonSpecies.color.name,
            stats: pokemon.stats
        }
    }

    render() {
        return(
            <div className='pokemonList'>
                <Navbar onNext={this.onNextClick} onPrevious={this.onPreviousClick} onSelectType={this.onSelectType} />
                {
                    this.state.isLoaded ?
                    <div className='pokemonList list'>
                        {
                            this.state.pokemonsToDisplay === null ? 
                            <div>Loading...</div> : 
                            <PokemonsListToDisplay pokemonSpecies={this.state.pokemonsToDisplay} onSelect={this.props.onSelect} />
                        }
                    </div> :
                    <div className='pokemonList list'>Loading...</div>
                }
            </div>
        );
    }
}

export default PokemonsList
