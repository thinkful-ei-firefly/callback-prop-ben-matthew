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

  omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }

  handleDelete = (id) => {
    const list = this.state.lists.map(obj => obj.cardIds.filter(cardId => cardId !== id));
    console.log(list); 
    this.setState({
      allCards: this.omit(this.state.allCards, id),
      lists: list
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
