import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from './Card';

export default class AllCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { nameFilter, rareFilter, trunfoFilter } = this.state;
    const { preview, onDeleteButtonClick, cards } = this.props;
    const filtredCards = cards
      .filter((card) => (!trunfoFilter ? true : card.trunfo))
      .filter((card) => (nameFilter === '' ? true : card.name.includes(nameFilter)))
      .filter((card) => (rareFilter === 'todas' ? true : card.rare === rareFilter));
    return (
      <div className="all-cards">
        <aside>
          <label htmlFor="nameFilter" className="label-nameFilter">
            <span>Filtro por nome: </span>
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
          <label htmlFor="rareFilter" className="label-rareFilter">
            <span>Filtro por raridade: </span>
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
          <label
            htmlFor="trunfoFilter"
            data-testid="trunfo-filter"
            className="label-trunfoFilter"
          >
            <input
              type="checkbox"
              name="trunfoFilter"
              id="trunfoFilter"
              checked={ trunfoFilter }
              onChange={ this.onInputChange }
            />
            <span>Filtro por trunfo:</span>
          </label>
        </aside>
        <section>
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
              onDeleteButtonClick={ onDeleteButtonClick }
              preview={ preview }
            />
          ))}
        </section>
      </div>
    );
  }
}

AllCards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardName: PropTypes.string,
      cardDescription: PropTypes.string,
      cardAttr1: PropTypes.string,
      cardAttr2: PropTypes.string,
      cardAttr3: PropTypes.string,
      cardImage: PropTypes.string,
      cardRare: PropTypes.string,
      cardTrunfo: PropTypes.string,
    }),
  ).isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
};
