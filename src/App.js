import React, { Component } from "react";
import List from "./List";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: this.props.store.lists,
      allCards: this.props.store.allCards
    };
  }

  omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
        key === keyToOmit ? newObj : { ...newObj, [key]: value },
      {}
    );
  }

  handleDelete = id => {
    const list = this.state.lists.map(obj => ({
      ...obj,
      cardIds: obj.cardIds.filter(card => card !== id)
    }));
    console.log(list);
    this.setState({
      allCards: this.omit(this.state.allCards, id),
      lists: list
    });
  };

  newRandomCard = () => {
    const id =
      Math.random()
        .toString(36)
        .substring(2, 4) +
      Math.random()
        .toString(36)
        .substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: "lorem ipsum"
    };
  };

  handleRandom = listId => {
    const randomCard = this.newRandomCard();
    const list = this.state.lists.map(obj => {
      if (obj.id === listId) {
        console.log(obj);
        return {
          ...obj,
          cardIds: [...obj.cardIds, randomCard.id]
        };
      } else {
        return obj;
      }
    });
    this.setState({
      lists: list,
      allCards: { ...this.state.allCards, [randomCard.id]: randomCard }
    });
  };

  render() {
    const { lists, allCards } = this.state;
    console.log(lists, allCards);
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => allCards[id])}
              handleDelete={this.handleDelete}
              handleRandom={this.handleRandom}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
