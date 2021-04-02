import React from 'react';
import PokemonsListToDisplay from './PokemonsListToDisplay'
import Navbar from './Navbar'

// const reducer = (state, action) => {
//     switch(action.type) {
//         case 'next': {
//             return { display: state.display };
//         }
//         case 'previous':
//             return;
//         default:
//             throw new Error();
//     }
// }

class PokemonsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            pokemonsToDisplay: {},
            pokemons: [],
            pokemonSpecies: [],
            filter: 'all',
            isLoaded: false
        }
    }

    async componentDidMount() {
        // await this.fetchPokemonSpecies(this.props.pokemons, this.state.offset, this.props.limit, this.state.filter);
        // // console.log(this.state.pokemonSpecies);
        // this.setState({
        //     // pokemonsToDisplay: this.state.pokemonSpecies,
        //     isLoaded: true
        // })
        this.renderPokemons();
    }

    shouldComponentUpdate() {
        return true;
    }

    renderPokemons = async () => {
        this.setState({
            // pokemonsToDisplay: this.state.pokemonSpecies,
            isLoaded: false
        })
        await this.fetchPokemonSpecies(this.props.pokemons, this.state.offset, this.props.limit, this.state.filter, this.props.lenght);
        // console.log(this.state.pokemonSpecies);
        this.setState({
            // pokemonsToDisplay: this.state.pokemonSpecies,
            isLoaded: true
        })
    }
    

    GetPokemons() {
        let pokemonsToGet = [];
        let offset = this.state === undefined ? 0 : this.state.offset; 

        for (let i = 0; i < this.props.limit; ++i) {

            pokemonsToGet.push(this.props.pokemons[offset + i]);
        }
        return pokemonsToGet;
    }

    

    fetchPokemonSpecies = async (pokemons, offset, limit, filter, lenght) => {
        let pokemonSpeciesArray = []
        let j = 0;
        // console.log('*******');
        // console.log(pokemons);
        // console.log(offset);
        // console.log(limit);
        // console.log(filter);
        for (let i = 0; j < limit && i < lenght - 1; ++i) {
            const response = await fetch(`${pokemons[offset + i].pokemon_species.url}`)
            const result = await response.json()

            const responsePokemon = await fetch(`${result.varieties[0].pokemon.url}`)
            const resultPokemon = await responsePokemon.json()
        
            for (const type of resultPokemon.types) {
                if (type.type.name === filter || filter === 'all') {
                    // console.log('*');
                    ++j;
                    pokemonSpeciesArray.push(pokemons[offset + i]);
                    break;
                }
            }
            console.log(j);
        }

        // console.log(pokemonSpeciesArray);
    
        this.setState({
            pokemonsToDisplay: pokemonSpeciesArray,
        })
    }

    // fetchPokemon = async (url) => {
    //     const response = await fetch(`${url}`)
    //     const result = await response.json()
       
    //     return result;
    // }

    onNextClick = async () => {
        if ((this.state.offset + this.props.limit) < this.props.lenght) {
            await this.setState({  
                offset: this.state.offset + this.props.limit,
                // pokemonsToDisplay: this.GetPokemons()
            });
            this.renderPokemons();
        }
    }

    onPreviousClick = async () => {
        if ((this.state.offset - this.props.limit) > 0) {
            await this.setState({
                offset: this.state.offset - this.props.limit,
                // pokemonsToDisplay: this.GetPokemons()
            });
            
            this.renderPokemons();
        }
   
    }

    onSelectType = async (e) => {
        await this.setState({
            filter: e,
            offset: 0
        });
        // console.log(this.state.filter);
        
        this.renderPokemons();
    }

    render() {
        if(!this.state.isLoaded) {
            return(
                <div className='pokemonList'>
                    <Navbar onNext={this.onNextClick} onPrevious={this.onPreviousClick} onSelectType={this.onSelectType} />
                    <div className='pokemonList list'>Loading...</div>
                </div>
            );
        }
        else {
            return(
                <div className='pokemonList'>
                    <Navbar onNext={this.onNextClick} onPrevious={this.onPreviousClick} onSelectType={this.onSelectType} />
                    <div className='pokemonList list'>
                        {this.state.pokemonsToDisplay === null ? <div>Loading...</div> : <PokemonsListToDisplay pokemonSpecies={this.state.pokemonsToDisplay} onSelect={this.props.onSelect} />}
                    </div>
                </div>
            );
        }
    }
}

// const PokemonsList = ({ limit, pokemons, amount }) => {
//     const [offset, setOffset] = useState(0);

//     const GetPokemons = () => {
        
//         let pokemonsToGet = [];
//         for (let i = 0; i < limit; ++i)
//         {
//             pokemonsToGet.push(pokemons[offset + i]);
//         }
//         return pokemonsToGet;
//     }

//     const [pokemonsToDisplay, setPokemonsToDisplay] = useState(GetPokemons());

//     const onPreviousClick = () => {
//         if ((offset - limit) > 0) {
//             setOffset(offset - limit);
//             setPokemonsToDisplay(GetPokemons());
//         }
            
//     }

//     const onNextClick = () => {
//         setOffset(offset + limit);
//         setPokemonsToDisplay(GetPokemons());
        
//     }

//     return (
//         <div>
//             <h1>{offset}</h1>
//             {
//                 pokemonsToDisplay.map((pokemon) => <h3>{pokemon.entry_number}</h3>)
//             }
//             <button onClick={onPreviousClick}>-</button>
//             <button onClick={onNextClick}>+</button>
//         </div>
//     );
// }

export default PokemonsList
