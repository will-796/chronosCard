import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      image: '',
      attr1: '0',
      attr2: '0',
      attr3: '0',
      rare: 'normal',
      trunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      nameFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
      cards: [],
    };
  }

  containsTrufoInCards = () => {
    const { cards } = this.state;
    if (cards.length === 0) return false;
    return cards.some((card) => card.trunfo);
  };

  validateButton = () => {
    const { name, description, image, attr1, attr2, attr3 } = this.state;

    const maxValue = 90;
    const minValue = 0;
    const maxSumValue = 210;

    const notEmpty = name !== '' && description !== '' && image !== '';

    const maxSum = Number(attr1) + Number(attr2) + Number(attr3) <= maxSumValue;

    const maxInputValue = Number(attr1) <= maxValue
      && Number(attr2) <= maxValue
      && Number(attr3) <= maxValue;

    const minInputValue = Number(attr1) >= minValue
      && Number(attr2) >= minValue
      && Number(attr3) >= minValue;

    if (notEmpty && maxSum && maxInputValue && minInputValue) {
      return false;
    }
    return true;
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(
      {
        [name]: value,
      },
      () => this.setState({
        isSaveButtonDisabled: this.validateButton(),
      }),
    );
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { name, description, image, attr1, attr2, attr3, rare, trunfo } = this.state;

    this.setState(
      (prev) => ({
        name: '',
        description: '',
        image: '',
        attr1: '0',
        attr2: '0',
        attr3: '0',
        rare: 'normal',
        trunfo: false,
        cards: [
          ...prev.cards,
          { name, description, image, attr1, attr2, attr3, rare, trunfo },
        ],
      }),
      () => this.setState({ hasTrunfo: this.containsTrufoInCards() }),
    );
  };

  onDeleteButtonClick = (name) => {
    this.setState(
      (prev) => ({
        cards: prev.cards.filter((card) => card.name !== name),
      }),
      () => this.setState({ hasTrunfo: this.containsTrufoInCards() }),
    );
  };

  render() {
    const {
      name,
      description,
      image,
      attr1,
      attr2,
      attr3,
      rare,
      trunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      nameFilter,
      rareFilter,
      trunfoFilter,
      cards,
    } = this.state;

    const filtredCards = cards
      .filter((card) => (!trunfoFilter ? true : card.trunfo))
      .filter((card) => (nameFilter === '' ? true : card.name.includes(nameFilter)))
      .filter((card) => (rareFilter === 'todas' ? true : card.rare === rareFilter));
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ image }
          cardRare={ rare }
          cardTrunfo={ trunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ image }
          cardRare={ rare }
          cardTrunfo={ trunfo }
          onDeleteButtonClick={ this.onDeleteButtonClick }
          preview={ false }
        />
        {filtredCards.map((card) => (
          <Card
            key={ card.name }
            cardName={ card.name }
            cardDescription={ card.description }
            cardAttr1={ card.attr1 }
            cardAttr2={ card.attr2 }
            cardAttr3={ card.attr3 }
            cardImage={ card.image }
            cardRare={ card.rare }
            cardTrunfo={ card.trunfo }
            onDeleteButtonClick={ this.onDeleteButtonClick }
            preview
          />
        ))}
        <label htmlFor="nameFilter">
          <input
            data-testid="name-filter"
            type="text"
            value={ nameFilter }
            name="nameFilter"
            id="nameFilter"
            onChange={ this.onInputChange }
            disabled={ trunfoFilter }
          />
        </label>
        <label htmlFor="rareFilter">
          <select
            name="rareFilter"
            id="rareFilter"
            data-testid="rare-filter"
            value={ rareFilter }
            onChange={ this.onInputChange }
            disabled={ trunfoFilter }
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfoFilter" data-testid="trunfo-filter">
          <input
            type="checkbox"
            name="trunfoFilter"
            id="trunfoFilter"
            checked={ trunfoFilter }
            onChange={ this.onInputChange }
          />
        </label>
      </div>
    );
  }
}

export default App;
