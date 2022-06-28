import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cat from '../images/gato.png';
import '../styles/card.css';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      preview,
      onDeleteButtonClick,
    } = this.props;
    const cardRareClass = cardRare === 'muito raro' ? 'muito-raro' : cardRare;
    return (
      <div className={ `card-container ${cardRareClass}` }>
        <div className="card">
          <p data-testid="name-card" className="name-card">{cardName || 'card name'}</p>
          <img data-testid="image-card" src={ cardImage || cat } alt={ cardName } />
          <p data-testid="description-card">{cardDescription || 'card description'}</p>
          <div className="attr-container">
            <p data-testid="attr1-card">{`for ${cardAttr1}`}</p>
            <p data-testid="attr2-card">{`int ${cardAttr2}`}</p>
            <p data-testid="attr3-card">{`vit ${cardAttr3}`}</p>
          </div>
          <p data-testid="rare-card">{cardRare}</p>

          {cardTrunfo && <p data-testid="trunfo-card">Super Trunfo</p>}
          {preview && (
            <button
              data-testid="delete-button"
              onClick={ () => onDeleteButtonClick(cardName) }
              type="button"
            >
              Excluir
            </button>
          )}
        </div>
      </div>

    );
  }
}

Card.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  preview: PropTypes.bool.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};
