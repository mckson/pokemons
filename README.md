# hosted demo
https://mckson-pokemons.herokuapp.com/
# pokemons
The goal of this challenge is to develop a ReactJS app for finding your favourite Pokemon. The app consumes the following API https://pokeapi.co/ 
# goals
1.	Single Page app displaying ALL Pokemon with their avatar, stats, basic information and type
2.	Filter Pokemon by Type(Water, Electric etc) 
3.	Clicking on a Pokemon reveals their moves list and evolution information(Which Pokemon will they evolve into AND what Pokemon have they evolved from) (NOT IMPLEMENTED)
# brief code walk-through
Application was implemented with help of ReactJS. Application structure: 
## public folder
in public folder you could find index.html that defines markup of the application, and other files, logos etc.
    
## src folder
in src there is main logic of application and styles are located
  
index.js - entry point of the application
index.css - styles for application components
App.js - "main" component of the application that is something like carcass where all other components are located 
src - contains folder components, where all components of application are located:
### PokemonList component
is like wrapper for next layer component PokemonListDisplayed that provides functionality for pagination over list of pokemons, fetching data and filtering pokemons by type
### PokemonListToDisplay
contains row of PokemonSpecies components that should be displayed in the current moment (pagination), wrapper for PokemonSpecies component
### PokemonSpecies
component that is responsible for fetching more concrete data about pokemon and passing this data ito PokemonCard child component
### PokemonCard 
component that is displayed directly on the user's screen among some other PokemonCard components, provides user with brief info about pokemon (id, name, type, appearance)

