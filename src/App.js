import React from 'react';
import AllCards from './components/AllCards';
import Card from './components/Card';
import Form from './components/Form';
import './styles/app.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      image: '',
      attr1: '',
      attr2: '',
      attr3: '',
      maxSumAttr: '210',
      rare: 'normal',
      trunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
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

    const maxSum = Number(attr1) + Number(attr2) + Number(attr3);
    const isValidSum = maxSum <= maxSumValue;

    const maxInputValue = Number(attr1) <= maxValue
      && Number(attr2) <= maxValue
      && Number(attr3) <= maxValue;

    const minInputValue = Number(attr1) >= minValue
      && Number(attr2) >= minValue
      && Number(attr3) >= minValue;

    this.setState(
      {
        attr1: Number(attr1) >= maxValue ? `${maxValue}` : attr1,
        attr2: Number(attr2) >= maxValue ? `${maxValue}` : attr2,
        attr3: Number(attr3) >= maxValue ? `${maxValue}` : attr3,
      },
      () => this.setState((prev) => ({
        maxSumAttr:
            maxSumValue
            - (Number(prev.attr1) + Number(prev.attr2) + Number(prev.attr3)),
      })),
    );

    if (notEmpty && isValidSum && maxInputValue && minInputValue) {
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
        isSaveButtonDisabled: true,
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
      maxSumAttr,
      rare,
      trunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      cards,
    } = this.state;

    return (
      <div className="app">
        <h1 className="header">Tryunfo</h1>
        <div className="form-preview">
          <Form
            cardName={ name }
            cardDescription={ description }
            cardAttr1={ attr1 }
            cardAttr2={ attr2 }
            cardAttr3={ attr3 }
            maxSumAttr={ maxSumAttr }
            cardImage={ image }
            cardRare={ rare }
            cardTrunfo={ trunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <div className="preview-container">
            <h1>Pré-visualização</h1>
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
          </div>
        </div>
        <h1 className="all-cards-title">Todas as cartas</h1>

        <AllCards
          cards={ cards }
          onDeleteButtonClick={ this.onDeleteButtonClick }
          preview
        />
      </div>
    );
  }
}

export default App;
