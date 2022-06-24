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
      isSaveButtonDisabled: true,
    };
  }

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

  onSaveButtonClick = () => {};

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
      isSaveButtonDisabled,
    } = this.state;
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
          hasTrunfo={ false }
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
        />
      </div>
    );
  }
}

export default App;
