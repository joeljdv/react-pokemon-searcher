import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state={
    display: true
  }

  handleImage = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleImage}>
            <img src={this.state.display? this.props.pokemon.sprites.front : this.props.pokemon.sprites.back}alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
