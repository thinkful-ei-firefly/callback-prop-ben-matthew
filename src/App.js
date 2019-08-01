import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      lists: this.props.store.lists,
      allCards: this.props.store.allCards,
    }
  }

  handleDelete = (id) => {
    const {id, ...rest} = this.state.allCards;
    this.setState({
      allCards: rest,
      lists: this.state.lists.map(obj => obj.cardIds.filter(cardId => cardId !== id))
    })
  }

  addRandomCard = () => {}

  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleDelete={this.handleDelete}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
