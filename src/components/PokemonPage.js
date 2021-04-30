import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

const URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      pokemons:[],
      name:'',
      hp:'',
      frontUrl:'',
      backUrl:'',
      search:''
    }
  }

  componentDidMount(){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      this.setState({
        pokemons:data
      })
    })
  }
    
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  submitPokemon = (e) => {
    e.preventDefault()
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        id:'',
        name: this.state.name,
        hp: this.state.hp,
        sprites: {
          front: this.state.frontUrl,
          back: this.state.backUrl
        }
      }),
      headers: {
      'Content-type': 'application/json',
      accept: 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.addNewPokemon(data)
    })
  }

  addNewPokemon = (newPokemon) => {
    this.setState({
      pokemons: [...this.state.pokemons, newPokemon]
    })
  }

  searchPoke = () => {
    return this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.search))
  }

  render() {
    console.log(this.state.pokemons)
    return (
      
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm submitPokemon={this.submitPokemon} change={this.handleChange}/>
        <br />
        <Search searchPokemon={this.handleChange}/>
        <br />
        <PokemonCollection pokemons={this.state.pokemons} search={this.searchPoke()} />
      </Container>
    )
  }
}

export default PokemonPage
