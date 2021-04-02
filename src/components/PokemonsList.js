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
            pokemonsToDisplay: this.GetPokemons(),
            pokemons: props.pokemons,
            filter: 'all'
        }
    }

    componentDidMount() {
        this.setState({
            pokemonsToDisplay: this.GetPokemons()
        })
    }

    shouldComponentUpdate() {
        return true;
    }

    

    GetPokemons() {
        let pokemonsToGet = [];
        let offset = this.state === undefined ? 0 : this.state.offset; 
        for (let i = 0; i < this.props.limit; ++i) {
            pokemonsToGet.push(this.props.pokemons[offset + i]);
        }
        return pokemonsToGet;
    }

    onPreviousClick = () => {
        if ((this.state.offset - this.props.limit) > 0) {
            this.setState({
                offset: this.state.offset - this.props.limit,
                pokemonsToDisplay: this.GetPokemons()
            });
        }
            
    }

    onNextClick = () => {
        this.setState({  
            offset: this.state.offset + this.props.limit,
            pokemonsToDisplay: this.GetPokemons()
        });
        this.Rerender()
    }

    Rerender = () => {
        this.forceUpdate();
    }

    onSelectType = (e) => {
        this.setState({
            filter: e
        });
        console.log(this.state.filter);
    }

    render() {
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
